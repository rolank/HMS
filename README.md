# HMS

### Quick Start

#### This command will:
- Build images if they don't exist
- Start all defined services (backend, frontend, database, etc.)
- Run containers in the background (-d flag)

```bash
docker compose up -d
```

#### This command will:
- Execute inside the hms-backend container
- Run Prisma migrations against the database
- Ensure database schema matches the codebase
```bash 
docker compose exec hms-backend npx prisma migrate deploy
```

### Stop and remove containers (recommended)
```bash 
docker compose down
```

### Stop only (containers remain)
```bash 
docker compose stop
```

#### Stop and remove everything including volumes
```bash 
docker compose down -v
```