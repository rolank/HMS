# HMS - Hospital Management System

A full-stack hospital management system for managing patients, appointments, encounters, and medical records. Built with Clean Architecture principles and Domain-Driven Design.

## Tech Stack

### Backend

- **Runtime**: Node.js 20 (TypeScript)
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Prisma
- **Architecture**: Clean Architecture / DDD

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Dev Server**: Port 5173

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)

### Quick Start

- Build images if they don't exist
- Start all defined services (MySQL database, backend API, frontend UI)
- Run containers in the background (-d flag)

```bash
docker compose up -d --build
```

**Services started:**

- MySQL: `localhost:3306`
- Backend API: `http://localhost:8080`
- Frontend UI: `http://localhost:5173` (mapped to container port 8080)

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
# Backend logs
docker compose logs -f hms-backend

# Frontend logs
docker compose logs -f hms-frontend

# All services
docker compose logs -f
```

## Development

### Local Development Mode

#### Backend (with hot-reload):

```bash
cd hms-backend
npm run dev
```

#### Frontend (with hot-reload):

```bash
cd frontend
npm run dev
```

**Notes**:

- The frontend container listens on port 8080 (Cloud Run default) and is mapped to host 5173 in docker-compose.
- The frontend expects the backend API at `http://localhost:8080/api/v1`.

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

frontend/src/
├── components/       # React components
├── pages/           # Page-level components
├── services/        # API integration layer
└── types/           # TypeScript type definitions
```

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
    patientId: "P002",
    medicalRecordNumber: "MRN1002",
    bloodType: "O+",
    insuranceProvider: "Aetna",
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
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

## Cloud SQL Connection

### For Cloud Run Deployment

When deploying to Google Cloud Run with Cloud SQL, update your `DATABASE_URL` environment variable to use the Unix socket format:

```bash
DATABASE_URL="mysql://USER:PASSWORD@localhost/hms_db?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME"
```

**Steps:**

1. **Create Cloud SQL instance** in Google Cloud Console
2. **Get connection name**: `PROJECT_ID:REGION:INSTANCE_NAME` (found in Cloud SQL instance details)
3. **Create database user** and password
4. **Update Cloud Run environment variables**:

   ```bash
   gcloud run deploy hms-backend \
     --image gcr.io/PROJECT_ID/hms-backend:latest \
     --add-cloudsql-instances PROJECT_ID:REGION:INSTANCE_NAME \
     --set-env-vars DATABASE_URL="mysql://USER:PASSWORD@localhost/hms_db?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME"
   ```

5. **Run migrations** (one-time setup):
   ```bash
   # From Cloud Shell or local with Cloud SQL Proxy
   docker run --rm \
     -e DATABASE_URL="mysql://USER:PASSWORD@CLOUD_SQL_IP:3306/hms_db" \
     gcr.io/PROJECT_ID/hms-backend:latest \
     npx prisma migrate deploy
   ```

### Connection Options

**Option 1: Unix Socket (Cloud Run - Recommended)**

```
DATABASE_URL="mysql://USER:PASSWORD@localhost/hms_db?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME"
```

- Automatic connection via Cloud Run's built-in Cloud SQL integration
- No need for Cloud SQL Auth Proxy
- Most secure and performant

**Option 2: Public IP (Testing/Development)**

```
DATABASE_URL="mysql://USER:PASSWORD@CLOUD_SQL_PUBLIC_IP:3306/hms_db"
```

- Requires adding your IP to Cloud SQL authorized networks
- Less secure, not recommended for production
- Useful for local testing against Cloud SQL

**Option 3: Cloud SQL Auth Proxy (Local Development)**

```bash
# Start proxy in a terminal
./cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:3306

# Use localhost in DATABASE_URL
DATABASE_URL="mysql://USER:PASSWORD@127.0.0.1:3306/hms_db"
```

### Troubleshooting

**Error: `Can't reach database server at unix(:3306`**

- Your `DATABASE_URL` format is incorrect for Cloud SQL
- Make sure you're using the Unix socket format with `?host=/cloudsql/...`
- Example: `mysql://root:password@localhost/hms_db?host=/cloudsql/my-project:us-central1:my-instance`

**Error: `Connection refused`**

- For Cloud Run: Ensure `--add-cloudsql-instances` flag is set during deployment
- For local: Verify Cloud SQL Auth Proxy is running
- Check that Cloud SQL instance is running and accessible

**Error: `Access denied for user`**

- Verify database user credentials in Cloud SQL
- Ensure the user has proper permissions on the database

## Contributing

When adding new features:

1. Start with domain entities/value objects
2. Define repository interfaces in `application/interfaces/`
3. Create use cases in `application/usecases/`
4. Implement repositories in `infrastructure/prisma/`
5. Wire together via factories in `interfaces/http/factories/`

## License
