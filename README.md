# HMS - Hospital Management System

A backend system for managing hospital operations including patients, appointments, encounters, and medical records. Built with Clean Architecture principles and Domain-Driven Design.

## Tech Stack

- **Runtime**: Node.js 20 (TypeScript)
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Prisma
- **Architecture**: Clean Architecture / DDD

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)

## Docker Compose

### Quick Start

#### This command will:

- Build images if they don't exist
- Start all defined services (backend, frontend, database, etc.)
- Run containers in the background (-d flag)

```bash
docker compose up -d --build
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

### View Logs

```bash
docker compose logs -f hms-backend
```

## Development

### Local Development Mode

Run with hot-reload inside the container:

```bash
cd hms-backend
npm run dev
```

### Making Database Changes

1. Edit `hms-backend/prisma/schema.prisma`
2. Create and apply migration:
   ```bash
   docker compose exec hms-backend npx prisma migrate dev --name <migration_name>
   ```
3. Restart the dev server if needed

### Project Structure

```
hms-backend/src/
├── domain/           # Business entities & value objects (no dependencies)
├── application/      # Use cases & business logic orchestration
├── infrastructure/   # Prisma repositories & external integrations
└── interfaces/       # HTTP controllers, routes, DTOs, middleware
```

For detailed architecture patterns and conventions, see [`.github/copilot-instructions.md`](.github/copilot-instructions.md)

## API Endpoints

Base URL: `http://localhost:8080/api/v1`

### Patients

- `POST /patients` - Create patient
- `GET /patients` - List all patients

### Appointments

- `POST /appointments` - Book appointment
- `GET /appointments` - List appointments
- `POST /appointments/:id/check-in` - Check-in appointment

### User Accounts

- `POST /useraccount/register` - Register user
- `POST /useraccount/login` - Login (basic auth)

## Testing

### Manual API Testing

Test endpoints from browser console:

#### Create Doctor

```javascript
fetch("http://localhost:8080/api/v1/doctors", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    // Person fields
    firstName: "Sarah",
    lastName: "Smith",
    dob: "1985-06-20",
    gender: "Female",
    address: "789 Medical Plaza",
    phone: "555-9999",
    // Employee fields
    employeeId: "EMP001",
    department: "Cardiology",
    salary: 150000,
    email: "sarah.smith@hospital.com",
    // Doctor fields
    specialty: "Cardiology",
    licenseNo: "MD-12345",
    qualification: "MD, Board Certified Cardiologist",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### Create Employee 

```javascript
fetch("http://localhost:8080/api/v1/employees", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    // Person fields
    firstName: "Emily",
    lastName: "Brown",
    dob: "1992-11-05",
    gender: "Female",
    address: "123 Hospital Way",
    phone: "555-2222",
    // Employee fields
    employeeId: "EMP1002",
    department: "Radiology",
    salary: 95000,
    email: "emily.brown@hospital.com",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### Create Patient

```javascript
fetch("http://localhost:8080/api/v1/patients", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    dob: "1995-05-01",
    gender: "Male",
    address: "123 Main St",
    phone: "555-1234",
    patientId: "P001",
    medicalRecordNumber: "MRN1001",
    bloodType: "O+",
    insuranceProvider: "Aetna",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### List Patients

```javascript
fetch("http://localhost:8080/api/v1/patients")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### Register User Account

```javascript
fetch("http://localhost:8080/api/v1/useraccount/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "jdoe",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
    dob: "1990-03-15",
    gender: "Female",
    address: "456 Oak Ave",
    phone: "555-5678",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### Login

```javascript
fetch("http://localhost:8080/api/v1/useraccount/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "jdoe",
    password: "password123",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### Book Appointment

```javascript
fetch("http://localhost:8080/api/v1/appointments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    appointmentDate: "2025-12-15T10:00:00Z",
    reason: "Annual checkup",
    doctorId: "doctor-uuid-here",
    patientId: "patient-uuid-here",
    bookedById: "person-uuid-here: The ownerId from UserAccount table",
    bookedByRole: "PATIENT",
    channel: "PATIENT_PORTAL",
    createdByUserAccountId: "useraccount-uuid-here",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### List Appointments

```javascript
fetch("http://localhost:8080/api/v1/appointments")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

#### Check-in Appointment

```javascript
fetch(
  "http://localhost:8080/api/v1/appointments/appointment-uuid-here/check-in",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      checkedInByUserAccountId: "useraccount-uuid-here",
      checkInChannel: "FRONT_DESK",
      notes: "Patient arrived on time",
    }),
  }
)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

## Architecture Highlights

- **Clean Architecture**: Strict dependency rules (domain → application → infrastructure → interfaces)
- **Domain-Driven Design**: Rich domain models with encapsulated behavior
- **Repository Pattern**: Abstract data access behind interfaces
- **Factory Pattern**: Dependency injection via controller factories
- **Table Per Hierarchy**: Person base entity with Patient/Employee specializations

## Contributing

When adding new features:

1. Start with domain entities/value objects
2. Define repository interfaces in `application/interfaces/`
3. Create use cases in `application/usecases/`
4. Implement repositories in `infrastructure/prisma/`
5. Wire together via factories in `interfaces/http/factories/`

See [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for detailed patterns and conventions.

## License

[Your License Here]
