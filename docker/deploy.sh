#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
detect_root_dir() {
  if [ -f "${PWD}/.env.production" ] && [ -d "${PWD}/apps" ]; then
    printf '%s\n' "$PWD"
    return
  fi

  if [ -f "${SCRIPT_DIR}/../.env.production" ] && [ -d "${SCRIPT_DIR}/../apps" ]; then
    (cd "${SCRIPT_DIR}/.." && pwd)
    return
  fi

  if [ -f "${SCRIPT_DIR}/../../.env.production" ] && [ -d "${SCRIPT_DIR}/../../apps" ]; then
    (cd "${SCRIPT_DIR}/../.." && pwd)
    return
  fi

  printf '%s\n' "$PWD"
}

ROOT_DIR="$(detect_root_dir)"

APP_ENV_INPUT="${APP_ENV:-${1:-}}"
SERVER_USER="${SERVER_USER:-ubuntu}"
SERVER_HOST="${SERVER_HOST:-}"
SERVER_KEY="${SERVER_KEY:-}"
REGISTRY="${REGISTRY:-local}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"
REMOTE_DIR="${REMOTE_DIR:-/tmp/surb-deploy}"
DEPLOY_MODE="${DEPLOY_MODE:-}"

declare -a ARTIFACTS=()
declare -a BUILD_ARGS=()
declare -a STACK_FILES=()

find_first_existing() {
  local path
  for path in "$@"; do
    if [ -f "$path" ]; then
      printf '%s\n' "$path"
      return 0
    fi
  done

  return 1
}

choose_environment() {
  local input="${APP_ENV_INPUT,,}"

  if [ -z "$DEPLOY_MODE" ]; then
    if [ -n "$SERVER_HOST" ]; then
      DEPLOY_MODE="remote"
    else
      DEPLOY_MODE="local"
    fi
  fi

  if [ -z "$input" ] && [ -t 0 ]; then
    echo "Escolha o ambiente de deploy:"
    select choice in "production" "development"; do
      case "${choice:-}" in
        production|development)
          input="$choice"
          break
          ;;
        *)
          echo "Opcao invalida."
          ;;
      esac
    done
  fi

  case "$input" in
    prod|production|"")
      APP_ENV="production"
      if [ "$DEPLOY_MODE" = "local" ]; then
        ENV_FILE="${ENV_FILE:-$(find_first_existing \
          "${PWD}/.env.production" \
          "${SCRIPT_DIR}/.env.production" \
          "${ROOT_DIR}/.env.production")}"
        STACK_FILES=("${STACK_FILE:-$(find_first_existing \
          "${PWD}/stack.yml" \
          "${SCRIPT_DIR}/stack.yml" \
          "${ROOT_DIR}/stack.yml")}")
      else
        ENV_FILE="${ENV_FILE:-${ROOT_DIR}/.env.production}"
        STACK_FILES=("${STACK_FILE:-${SCRIPT_DIR}/stack.yml}")
      fi
      STACK_NAME="${STACK_NAME:-surb}"
      TAR_DIR="${TAR_DIR:-${TMPDIR:-/tmp}/surb-deploy-production}"
      BUILD_MODE="multi"
      ;;
    dev|development)
      APP_ENV="development"
      if [ "$DEPLOY_MODE" = "local" ]; then
        ENV_FILE="${ENV_FILE:-$(find_first_existing \
          "${PWD}/.env.development" \
          "${SCRIPT_DIR}/.env.development" \
          "${ROOT_DIR}/.env.development")}"
        STACK_FILES=(
          "${STACK_FILE:-$(find_first_existing \
            "${PWD}/stack.yml" \
            "${SCRIPT_DIR}/stack.yml" \
            "${ROOT_DIR}/stack.yml")}"
          "$(find_first_existing \
            "${PWD}/stack.development.yml" \
            "${SCRIPT_DIR}/stack.development.yml" \
            "${ROOT_DIR}/stack.development.yml")"
        )
      else
        ENV_FILE="${ENV_FILE:-${ROOT_DIR}/.env.development}"
        STACK_FILES=(
          "${SCRIPT_DIR}/stack.yml"
          "${STACK_FILE:-${SCRIPT_DIR}/stack.development.yml}"
        )
      fi
      STACK_NAME="${STACK_NAME:-surb-dev}"
      TAR_DIR="${TAR_DIR:-${TMPDIR:-/tmp}/surb-deploy-development}"
      BUILD_MODE="single"
      ;;
    *)
      echo "Erro: ambiente invalido. Use production ou development." >&2
      exit 1
      ;;
  esac
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Erro: comando obrigatorio nao encontrado: $1" >&2
    exit 1
  }
}

load_env_file() {
  if [ ! -f "$ENV_FILE" ]; then
    echo "Erro: arquivo de ambiente nao encontrado: $ENV_FILE" >&2
    exit 1
  fi

  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a

  STACK_NAME="${STACK_NAME:-${STACK_NAME_DEFAULT:-surb}}"
  REGISTRY="${REGISTRY:-local}"
  IMAGE_TAG="${IMAGE_TAG:-latest}"
  PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"
  REMOTE_DIR="${REMOTE_DIR:-/tmp/surb-deploy}"
}

validate_config() {
  if [ "$DEPLOY_MODE" = "remote" ] && [ -z "$SERVER_HOST" ]; then
    echo "Erro: informe SERVER_HOST. Exemplo: SERVER_HOST=1.2.3.4 ./deploy.sh production" >&2
    exit 1
  fi

  if [ "$DEPLOY_MODE" = "remote" ] && [ -n "$SERVER_KEY" ] && [ ! -f "${SERVER_KEY/#\~/$HOME}" ]; then
    echo "Erro: chave SSH nao encontrada: $SERVER_KEY" >&2
    exit 1
  fi

  if [ "$APP_ENV" = "production" ] && grep -q "CHANGE_ME" "$ENV_FILE"; then
    echo "Erro: troque os valores CHANGE_ME em $ENV_FILE antes do deploy." >&2
    exit 1
  fi
}

ssh_cmd() {
  if [ -n "$SERVER_KEY" ]; then
    ssh -i "${SERVER_KEY/#\~/$HOME}" "$@"
  else
    ssh "$@"
  fi
}

load_local_artifacts() {
  local candidates=()
  local artifact

  if [ "$APP_ENV" = "production" ]; then
    candidates+=(
      "${PWD}/surb-frontend-${IMAGE_TAG}.oci.tar"
      "${PWD}/surb-backend-${IMAGE_TAG}.oci.tar"
      "${PWD}/surb-auth-${IMAGE_TAG}.oci.tar"
      "${PWD}/surb-images-${IMAGE_TAG}.tar"
      "${REMOTE_DIR}/surb-frontend-${IMAGE_TAG}.oci.tar"
      "${REMOTE_DIR}/surb-backend-${IMAGE_TAG}.oci.tar"
      "${REMOTE_DIR}/surb-auth-${IMAGE_TAG}.oci.tar"
      "${REMOTE_DIR}/surb-images-${IMAGE_TAG}.tar"
    )
  else
    candidates+=(
      "${PWD}/surb-images-${IMAGE_TAG}.tar"
      "${REMOTE_DIR}/surb-images-${IMAGE_TAG}.tar"
    )
  fi

  ARTIFACTS=()
  for artifact in "${candidates[@]}"; do
    if [ -f "$artifact" ]; then
      ARTIFACTS+=("$artifact")
    fi
  done
}

scp_cmd() {
  if [ -n "$SERVER_KEY" ]; then
    scp -i "${SERVER_KEY/#\~/$HOME}" "$@"
  else
    scp "$@"
  fi
}

get_frontend_build_args() {
  local keys=(
    NEXT_PUBLIC_APP_NAME
    NEXT_PUBLIC_APP_URL
    NEXT_PUBLIC_API_URL
    NEXT_PUBLIC_AUTH_URL
    BASE_URL
    SHORT_NAME
    CONTACT_EMAIL
    WHATSAPPs
    CORS_ORIGINS
  )

  BUILD_ARGS=()
  for key in "${keys[@]}"; do
    if [ -n "${!key:-}" ]; then
      BUILD_ARGS+=("--build-arg" "${key}=${!key}")
    fi
  done
}

build_images() {
  if [ "$DEPLOY_MODE" = "local" ]; then
    return
  fi

  echo "Build das imagens Docker para ${APP_ENV}..."
  mkdir -p "$TAR_DIR"
  ARTIFACTS=()

  get_frontend_build_args

  if [ "$BUILD_MODE" = "single" ]; then
    local tar_file="${TAR_DIR}/surb-images-${IMAGE_TAG}.tar"

    docker build "${BUILD_ARGS[@]}" -f apps/frontend/Dockerfile --target production -t "${REGISTRY}/surb-frontend:${IMAGE_TAG}" "$ROOT_DIR"
    docker build -f apps/backend/Dockerfile --target production -t "${REGISTRY}/surb-backend:${IMAGE_TAG}" "$ROOT_DIR"
    docker build -f apps/auth/Dockerfile --target production -t "${REGISTRY}/surb-auth:${IMAGE_TAG}" "$ROOT_DIR"

    docker save \
      "${REGISTRY}/surb-frontend:${IMAGE_TAG}" \
      "${REGISTRY}/surb-backend:${IMAGE_TAG}" \
      "${REGISTRY}/surb-auth:${IMAGE_TAG}" \
      -o "$tar_file"

    ARTIFACTS+=("$tar_file")
    return
  fi

  local frontend_tar="${TAR_DIR}/surb-frontend-${IMAGE_TAG}.oci.tar"
  local backend_tar="${TAR_DIR}/surb-backend-${IMAGE_TAG}.oci.tar"
  local auth_tar="${TAR_DIR}/surb-auth-${IMAGE_TAG}.oci.tar"

  docker buildx build "${BUILD_ARGS[@]}" \
    --platform "$PLATFORMS" \
    --target production \
    --tag "${REGISTRY}/surb-frontend:${IMAGE_TAG}" \
    --output "type=oci,dest=$frontend_tar" \
    -f apps/frontend/Dockerfile \
    "$ROOT_DIR"

  docker buildx build \
    --platform "$PLATFORMS" \
    --target production \
    --tag "${REGISTRY}/surb-backend:${IMAGE_TAG}" \
    --output "type=oci,dest=$backend_tar" \
    -f apps/backend/Dockerfile \
    "$ROOT_DIR"

  docker buildx build \
    --platform "$PLATFORMS" \
    --target production \
    --tag "${REGISTRY}/surb-auth:${IMAGE_TAG}" \
    --output "type=oci,dest=$auth_tar" \
    -f apps/auth/Dockerfile \
    "$ROOT_DIR"

  ARTIFACTS+=("$frontend_tar" "$backend_tar" "$auth_tar")
}

deploy_remote() {
  local remote="${SERVER_USER}@${SERVER_HOST}"
  local artifact_basenames=()
  local stack_file_args=""
  local artifact

  for artifact in "${ARTIFACTS[@]}"; do
    artifact_basenames+=("$(basename "$artifact")")
  done

  for artifact in "${STACK_FILES[@]}"; do
    stack_file_args+=" -c '$(basename "$artifact")'"
  done

  echo "Enviando artefatos para ${remote}:${REMOTE_DIR}..."
  ssh_cmd "$remote" "mkdir -p '$REMOTE_DIR'"
  scp_cmd "${STACK_FILES[@]}" "$ENV_FILE" "${ARTIFACTS[@]}" "${remote}:${REMOTE_DIR}/"

  echo "Carregando imagens e aplicando stack..."
  ssh_cmd "$remote" "
    set -eu
    cd '$REMOTE_DIR'
    for archive in ${artifact_basenames[*]}; do
      docker load -i \"\$archive\"
    done
    set -a
    . '$(basename "$ENV_FILE")'
    set +a
    docker stack deploy${stack_file_args} --with-registry-auth --detach=false '$STACK_NAME'
    docker stack services '$STACK_NAME'
  "
}

deploy_local() {
  local artifact
  local stack_args=()

  load_local_artifacts

  echo "Carregando imagens locais e aplicando stack..."
  for artifact in "${ARTIFACTS[@]}"; do
    echo "docker load -i $artifact"
    docker load -i "$artifact"
  done

  for artifact in "${STACK_FILES[@]}"; do
    stack_args+=("-c" "$artifact")
  done

  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a

  docker stack deploy "${stack_args[@]}" --with-registry-auth --detach=false "$STACK_NAME"
  docker stack services "$STACK_NAME"
}

cleanup_local() {
  for artifact in "${ARTIFACTS[@]}"; do
    rm -f "$artifact"
  done
}

main() {
  require_command docker
  choose_environment
  load_env_file
  validate_config

  if [ "$DEPLOY_MODE" = "remote" ]; then
    require_command ssh
    require_command scp
    echo "Deploy ${STACK_NAME} (${APP_ENV}, ${IMAGE_TAG}) para ${SERVER_USER}@${SERVER_HOST}"
    echo "Stack: ${STACK_FILES[*]}"
    echo "Env:   $ENV_FILE"
    build_images
    deploy_remote
    cleanup_local
  else
    echo "Deploy local ${STACK_NAME} (${APP_ENV}, ${IMAGE_TAG}) em ${PWD}"
    echo "Stack: ${STACK_FILES[*]}"
    echo "Env:   $ENV_FILE"
    deploy_local
  fi

  echo "Deploy concluido: ${APP_URL:-https://${DOMAIN:-surb.com.br}}"
}

main "$@"
