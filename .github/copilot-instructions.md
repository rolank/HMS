# HMS - Hospital Management System

## Architecture Overview

This is a **Clean Architecture / DDD** backend using TypeScript, Express, Prisma ORM, and MySQL. The system manages patients, appointments, encounters, and medical records.

### Core Layers (Strict Dependency Rules)

- **Domain** (`domain/`): Pure business entities with private fields and getters/setters. No external dependencies.
  - Entities like `Person`, `Patient`, `Doctor` use class-based OOP with encapsulated state
  - Value objects like `EmergencyContact` are immutable-style classes with IDs
  - Example: `Patient` extends `Person` base class, adding patient-specific fields
- **Application** (`application/`): Use cases orchestrate domain logic. Depend only on domain + repository interfaces.
  - Pattern: `CreatePatientUseCase` receives `IPatientRepository` via constructor injection
  - Commands are plain objects, not DTOs (e.g., `Command` interface in use cases)
- **Infrastructure** (`infrastructure/`): Prisma repositories implement interfaces from application layer
  - Mappers convert domain entities ↔ Prisma models (e.g., `PatientMapper.toPrisma()`)
  - Repository pattern: `PrismaPatientRepository` implements `IPatientRepository`
- **Interfaces** (`interfaces/`): HTTP controllers, routes, middleware, DTOs
  - Factory pattern: `AppointmentControllerFactory.create()` wires dependencies
  - Routes mounted at `/api/v1` (see `app.ts`)

### Key Domain Patterns

- **Table Per Hierarchy**: `Person` is base entity; `Patient`, `Employee` extend it via Prisma's 1:1 relationships
- **Aggregate Roots**: `MedicalRecord` owns `VitalSign[]`, `Diagnosis[]`, `Order[]`, etc.
- **Domain Events**: `EventBus` class exists in `domain/events/` but not wired to use cases (planned feature)
- **Notification System**: Domain models (`NotificationRequest`, `NotificationPreference`) exist but no use case implementation yet
- **Entity IDs**: UUIDs generated via `randomUUID()` in domain layer (never in Prisma defaults)

## Development Workflow

### Docker Setup (Required)

```bash
# Start MySQL + backend services
docker compose up -d

# Run migrations AFTER containers start
docker compose exec hms-backend npx prisma migrate deploy
```

### Local Development (Inside Container)

```bash
cd hms-backend
npm run dev  # ts-node-dev with auto-reload
```

### Database Changes

1. Edit `prisma/schema.prisma`
2. Run migration:
   ```bash
   docker compose exec hms-backend npx prisma migrate dev --name <migration_name>
   ```
3. Prisma Client auto-regenerates; restart dev server if needed

### Building for Production

- Multi-stage Dockerfile: builder stage compiles TS → JS, runtime stage runs `dist/server.js`
- Prisma generates client during build with dummy DATABASE_URL

## Critical Conventions

### Entity Construction

Domain entities use **class-based OOP** with private fields:

```typescript
// Correct: Person as base, Patient extends it
const person = new Person(
  uuid,
  firstName,
  lastName,
  dob,
  gender,
  address,
  phone,
  contacts
);
const patient = new Patient(person, patientId, mrn, bloodType, insurance);
```

### Mapper Pattern

Infrastructure mappers handle Prisma nested writes:

```typescript
// PatientMapper.toPrisma() creates nested person.create with emergencyContacts
await prisma.patient.create({ data: PatientMapper.toPrisma(patient) });
```

### Factory Pattern for DI

Controllers instantiated via factories to wire dependencies:

```typescript
// Factory creates repo → use cases → controller
const repo = new PrismaPatientRepository();
const useCase = new CreatePatientUseCase(repo);
const controller = new PatientController(useCase);
```

### Enum Types

Prisma enums mirror domain enums (e.g., `AppointmentStatus`, `BookingChannel`, `RecordStatus`). Use Prisma-generated enums in repositories.

## API Endpoints

Base URL: `http://localhost:8080/api/v1`

### Implemented

- `POST /patients` - Create patient (see README.md for fetch example)
- `GET /patients` - List all patients
- `POST /appointments` - Book appointment
- `GET /appointments` - List appointments
- `POST /appointments/:id/check-in` - Check-in appointment
- `POST /useraccount/register` - Register user account
- `POST /useraccount/login` - Login (basic auth, no JWT yet)

### Authentication Status

- **Basic auth implemented**: Login/register use cases exist with plain password comparison (`HASHED:` prefix)
- **No JWT middleware yet**: JWT_SECRET in env but token generation/validation not implemented
- **No protected routes**: All endpoints currently public; add auth middleware when JWT is ready
- **Future**: Implement proper bcrypt hashing and JWT generation in `LoginUserUseCase`

## Database Schema Highlights

- **Person** base table with 1:1 to Patient/Employee/UserAccount
- **EmergencyContact** as separate table (value object pattern)
- **Doctor** is specialization of Employee (1:1 relationship)
- **Appointment → Encounter → MedicalRecord** chain (1:1:1)
- **UserAccount** tracks createdBy/checkedInBy/signedBy for audit trails

## Common Pitfalls

- **Don't bypass domain layer**: Always create entities, then use mappers for Prisma
- **UUIDs in domain**: Generate IDs in domain layer (`randomUUID()`), not in Prisma defaults
- **Person inheritance**: Patient/Employee share Person table; use personId foreign key
- **Migration order**: Always `migrate deploy` after `docker compose up` for fresh DBs
- **Factory imports**: Import from `interfaces/http/factories/`, not controllers directly

## Testing Strategy

- **Current**: Manual API testing via `fetch()` calls from browser console (see README.md examples)
- **No test framework**: No Jest/Mocha configured; when adding tests, place in `__tests__/` with `.test.ts` suffix
- **Future structure**: Mirror src/ structure → `__tests__/domain/`, `__tests__/application/`, etc.
- **Integration tests**: Test against running Docker container, not mocked Prisma

## Environment Variables

Required in `.env` (or docker-compose.yml):

- `DATABASE_URL` - MySQL connection string
- `PORT` - Backend port (default 8080)
- `JWT_SECRET` - For authentication (not yet implemented)
- `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE` - For MySQL container
