# HMS

<<<<<<< HEAD
# This command will:
# - Build images if they don't exist
# - Start all defined services (backend, frontend, database, etc.)
# - Run containers in the background (-d flag)
=======
### Quick Start

#### This command will:
- Build images if they don't exist
- Start all defined services (backend, frontend, database, etc.)
- Run containers in the background (-d flag)
>>>>>>> 92295be (README.md file for Docker Compose)

```bash
docker compose up -d
```

<<<<<<< HEAD
# This command will:
# - Execute inside the hms-backend container
# - Run Prisma migrations against the database
# - Ensure database schema matches the codebase
=======
#### This command will:
- Execute inside the hms-backend container
- Run Prisma migrations against the database
- Ensure database schema matches the codebase
>>>>>>> 92295be (README.md file for Docker Compose)
```bash 
docker compose exec hms-backend npx prisma migrate deploy
```

<<<<<<< HEAD
# Stop and remove containers (recommended)
=======
### Stop and remove containers (recommended)
>>>>>>> 92295be (README.md file for Docker Compose)
```bash 
docker compose down
```

<<<<<<< HEAD
# Stop only (containers remain)
=======
### Stop only (containers remain)
>>>>>>> 92295be (README.md file for Docker Compose)
```bash 
docker compose stop
```

<<<<<<< HEAD
# Stop and remove everything including volumes
=======
#### Stop and remove everything including volumes
>>>>>>> 92295be (README.md file for Docker Compose)
```bash 
docker compose down -v
```