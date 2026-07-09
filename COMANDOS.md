# Comandos Docker Essenciais

## Dev local no Windows 10

Ambiente usado: `.env.development`

Executavel por clique:

```powershell
.\docker\dev-windows-run.cmd
```

Comandos manuais:

```powershell
.\docker\dev-windows.ps1 validate
.\docker\dev-windows.ps1 up -Detached
.\docker\dev-windows.ps1 infra -Detached
.\docker\dev-windows.ps1 project -Detached
.\docker\dev-windows.ps1 ps
.\docker\dev-windows.ps1 logs -Follow
.\docker\dev-windows.ps1 logs -Service backend -Follow
.\docker\dev-windows.ps1 down
.\docker\dev-windows.ps1 clean -Volumes
```

Entrar no container do projeto:

```powershell
docker compose --project-name surb-dev --env-file .env.development -f docker\compose.dev.windows.yml exec project sh
```

URLs locais:

- Frontend: http://localhost:3000
- Backend docs: http://localhost:4000/docs
- Auth docs: http://localhost:4001/docs
- Postgres: localhost:5432
- Redis: localhost:6379

## Build das imagens

Ambiente usado por padrao: `.env.production`

Executavel por clique:

```powershell
.\docker\images-windows-run.cmd
```

```powershell
docker build -f apps/frontend/Dockerfile --target production -t local/surb-frontend:latest .
docker build -f apps/backend/Dockerfile --target production -t local/surb-backend:latest .
docker build -f apps/auth/Dockerfile --target production -t local/surb-auth:latest .
```

No menu Windows:

- `2` para build local de desenvolvimento
- `3` para build multi-plataforma de produção
- `D` para gerar frontend VPS ARM64 como `surb/frontend:production`
- `G` para escolher o formato da imagem:
  - `1` frontend `.tar` ARM64 para VPS `aarch64`
  - `2` backend `.tar` ARM64 para VPS `aarch64`
  - `3` auth `.tar` ARM64 para VPS `aarch64`
  - `4` frontend `.tar.gz` ARM64
  - `5` backend `.tar.gz` ARM64
  - `6` auth `.tar.gz` ARM64

Build multi-plataforma (AMD64 + ARM64) em arquivos OCI `.tar.gz`:

```powershell
.\docker\images-windows.ps1 multi-oci-gzip
```

Saidas geradas:

- `docker\dist\surb-frontend-latest-multi.oci.tar.gz`
- `docker\dist\surb-backend-latest-multi.oci.tar.gz`
- `docker\dist\surb-auth-latest-multi.oci.tar.gz`

Plataformas configuradas em `.env.production`:

```env
PLATFORMS=linux/amd64,linux/arm64
```

Para usar outro arquivo de producao:

```powershell
.\docker\images-windows.ps1 info -EnvFile .\.env.production
```

Pacotes individuais/profissionais:

```powershell
# Frontend isolado, sem banco/redis
.\docker\images-windows.ps1 build-frontend
.\docker\images-windows.ps1 tar-frontend-gzip

# APIs sem dependencias externas no pacote
.\docker\images-windows.ps1 build-api
.\docker\images-windows.ps1 tar-api-gzip

# APIs com dependencias oficiais para ambiente fechado/offline
.\docker\images-windows.ps1 tar-api-deps-gzip

# Somente dependencias oficiais de runtime
.\docker\images-windows.ps1 tar-runtime-deps-gzip
```

Alternativa recomendada para producao:

- Frontend: pacote separado `surb-frontend-*.tar.gz`, sem Postgres/Redis.
- Backend/Auth: pacote `surb-api-*.tar.gz`.
- Banco/cache: usar imagens oficiais `postgres:16-alpine` e `redis:7-alpine` no servidor ou no pacote `surb-runtime-deps-*.tar.gz` quando o ambiente for offline.

Atalhos PNPM:

```powershell
pnpm build:frontend
pnpm build:backend
pnpm build:auth
pnpm build:all
```

## Deploy Swarm/Portainer

Ambiente usado por padrao: `.env.production`

Setup inicial do servidor:

```bash
cd docker
chmod +x setup-server.sh deploy.sh
bash ./setup-server.sh production
```

Deploy via script:

```bash
SERVER_HOST=SEU_IP SERVER_USER=ubuntu SERVER_KEY=~/.ssh/sua-chave.pem ./docker/deploy.sh production
```

Deploy de desenvolvimento:

```bash
SERVER_HOST=SEU_IP SERVER_USER=ubuntu SERVER_KEY=~/.ssh/sua-chave.pem ./docker/deploy.sh development
```

Sobrescrever arquivo de ambiente:

```bash
ENV_FILE=.env.production SERVER_HOST=SEU_IP ./docker/deploy.sh
```

Arquivos usados:

- `.env.production`
- `.env.production.example`
- `docker/stack.yml`
- `docker/stack.development.yml`
- `docker/deploy.sh`
- `docker/setup-server.sh`

### Deploy no Portainer via `/tmp`

1. No servidor, rode o setup do ambiente:

```bash
cd docker
./setup-server.sh production
```

2. Gere as imagens no Windows com o menu adequado:

- `2` para desenvolvimento, imagem de plataforma unica
- `3` para producao, imagens multi-plataforma

3. Envie e publique a stack a partir da sua maquina:

```bash
SERVER_HOST=SEU_IP SERVER_USER=ubuntu SERVER_KEY=~/.ssh/sua-chave.pem ./docker/deploy.sh production
```

4. O script envia os arquivos para `/tmp/surb-deploy` no servidor, executa `docker load` e depois faz `docker stack deploy`.

5. No Portainer, confira a stack `surb` ou `surb-dev` em `Stacks`.

6. Para desenvolvimento, use:

```bash
SERVER_HOST=SEU_IP SERVER_USER=ubuntu SERVER_KEY=~/.ssh/sua-chave.pem ./docker/deploy.sh development
```

7. Se precisar atualizar sem mudar ambiente, rode novamente o mesmo comando. O script sobrescreve os artefatos em `/tmp/surb-deploy` e reaplica a stack.

### Imagem frontend para VPS ARM64

Use quando a VPS retornar `aarch64` em `uname -m` e a stack usar:

```yaml
image: surb/frontend:production
```

Gerar no Windows:

```powershell
.\docker\images-windows.ps1 vps-frontend-arm64-tar
```

Arquivo gerado:

```text
docker\dist\surb-frontend-production-arm64.tar
```

Enviar para a VPS:

```bash
scp docker/dist/surb-frontend-production-arm64.tar ubuntu@SEU_IP:/tmp/
```

Se tiver enviado o arquivo compactado `.gz`, converta dentro da VPS:

```bash
gunzip -k surb-frontend-production-arm64.tar.gz
```

Carregar e validar na VPS:

```bash
docker load -i surb-frontend-production-arm64.tar
docker image inspect surb/frontend:production --format '{{.Os}}/{{.Architecture}}'
```

Resultado esperado:

```text
linux/arm64
```
