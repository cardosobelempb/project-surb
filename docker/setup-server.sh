#!/usr/bin/env bash
# setup-server.sh - roda UMA VEZ antes do primeiro deploy

set -euo pipefail

APP_ENV_INPUT="${APP_ENV:-${1:-}}"

choose_environment() {
  local input="${APP_ENV_INPUT,,}"

  if [ -z "$input" ] && [ -t 0 ]; then
    echo "Escolha o ambiente do servidor:"
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
      STACK_NAME="surb"
      POSTGRES_VOLUME="surb_postgres_data"
      REDIS_VOLUME="surb_redis_data"
      ;;
    dev|development)
      APP_ENV="development"
      STACK_NAME="surb-dev"
      POSTGRES_VOLUME="surb_dev_postgres_data"
      REDIS_VOLUME="surb_dev_redis_data"
      ;;
    *)
      echo "Erro: ambiente invalido. Use production ou development." >&2
      exit 1
      ;;
  esac
}

choose_environment

echo "══════════════════════════════════════════"
echo " Setup do servidor SURB (${APP_ENV})"
echo "══════════════════════════════════════════"

# ── Swarm ─────────────────────────────────────────────────────
if ! docker info | grep -q "Swarm: active"; then
  echo "Iniciando Docker Swarm..."
  docker swarm init
else
  echo "Swarm ja ativo."
fi

# ── Rede overlay compartilhada com o Traefik ──────────────────
if ! docker network ls | grep -q "network_public"; then
  echo "Criando rede overlay network_public..."
  docker network create --driver overlay --attachable network_public
else
  echo "Rede network_public ja existe."
fi

# ── Volumes externos ou locais por ambiente ───────────────────
for VOL in "$POSTGRES_VOLUME" "$REDIS_VOLUME"; do
  if ! docker volume ls | grep -q "^local.*$VOL$"; then
    echo "Criando volume: $VOL"
    docker volume create "$VOL"
  else
    echo "Volume $VOL ja existe."
  fi
done

echo ""
echo "Pronto! Use docker/deploy.sh $APP_ENV para publicar este ambiente."
if [ "$APP_ENV" = "production" ]; then
  echo "Stack esperado: docker/stack.yml"
else
  echo "Stack esperado: docker/stack.yml + docker/stack.development.yml"
fi
echo "══════════════════════════════════════════"
