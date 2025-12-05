# HMS Microservices Refactoring Plan

**Start Date: Tuesday, December 9, 2025**

## Current Status (as of Dec 4, 2025)

✅ Monolithic backend fully functional  
✅ Cloud deployment secured (private IP, backups enabled)  
✅ Patient, Doctor, Employee, Appointment APIs working  
✅ Database: 17 tables with Clean Architecture/DDD pattern  
✅ Frontend: Single page with all forms

## Phase 1: Microservices Architecture (Week 1-2)

### 1.1 Create Service Boundaries

Break monolithic backend into separate services:

```
hms-patients-service/
├── src/
│   ├── domain/entities/Patient.ts, Person.ts
│   ├── application/usecases/
│   ├── infrastructure/prisma/
│   └── interfaces/http/
├── Dockerfile
└── package.json

hms-doctors-service/
├── src/
│   ├── domain/entities/Doctor.ts, Employee.ts
│   ├── application/usecases/
│   └── interfaces/http/
└── ...

hms-appointments-service/
├── src/
│   ├── domain/entities/Appointment.ts
│   ├── application/usecases/
│   └── interfaces/http/
└── ...

hms-encounters-service/
├── src/
│   ├── domain/entities/Encounter.ts, MedicalRecord.ts
│   └── ...

hms-auth-service/
├── src/
│   ├── domain/entities/UserAccount.ts
│   ├── JWT token generation
│   └── ...

hms-api-gateway/
├── src/
│   ├── routes/ (proxy to services)
│   ├── middleware/auth.ts (JWT validation)
│   └── ...
```

### 1.2 Database Strategy

**Option A: Shared Database** (Faster to implement)

- All services connect to same Cloud SQL
- Schema separation via naming conventions
- Easier transaction management

**Option B: Database per Service** (Better isolation)

- hms-patients-db, hms-doctors-db, etc.
- More complex but better scalability
- Requires distributed transactions/sagas

**Recommendation**: Start with Option A, migrate to Option B later

### 1.3 Docker Compose Setup

```yaml
services:
  api-gateway:
    build: ./hms-api-gateway
    ports: ["8080:8080"]

  patients-service:
    build: ./hms-patients-service
    ports: ["8081:8081"]

  doctors-service:
    build: ./hms-doctors-service
    ports: ["8082:8082"]

  appointments-service:
    build: ./hms-appointments-service
    ports: ["8083:8083"]

  auth-service:
    build: ./hms-auth-service
    ports: ["8084:8084"]
```

## Phase 2: Frontend Refactoring (Week 2-3)

### 2.1 Separate Forms into Components

Move from single `App.tsx` to dedicated pages:

```
frontend/src/
├── pages/
│   ├── Dashboard.tsx              # Landing page
│   ├── PatientManagement.tsx      # CRUD for patients
│   ├── DoctorManagement.tsx       # CRUD for doctors
│   ├── AppointmentScheduler.tsx   # Calendar view + booking
│   ├── EncounterManagement.tsx    # Check-in & encounters
│   └── UserAccounts.tsx           # Registration & login
│
├── components/
│   ├── forms/
│   │   ├── PatientForm.tsx
│   │   ├── DoctorForm.tsx
│   │   ├── EmployeeForm.tsx
│   │   ├── AppointmentForm.tsx
│   │   └── UserRegistrationForm.tsx
│   ├── lists/
│   │   ├── PatientList.tsx
│   │   ├── DoctorList.tsx
│   │   └── AppointmentList.tsx
│   └── common/
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── LoadingSpinner.tsx
│
├── services/
│   ├── apiClient.ts              # Base HTTP client
│   ├── patientService.ts         # Calls patients-service
│   ├── doctorService.ts          # Calls doctors-service
│   ├── appointmentService.ts     # Calls appointments-service
│   └── authService.ts            # Calls auth-service
│
├── hooks/
│   ├── usePatients.ts
│   ├── useDoctors.ts
│   └── useAuth.ts
│
└── App.tsx                       # Router + layout
```

### 2.2 Add React Router

```bash
npm install react-router-dom
```

Routes:

- `/` - Dashboard
- `/patients` - Patient management
- `/doctors` - Doctor management
- `/appointments` - Appointment scheduler
- `/encounters` - Encounter management
- `/login` - Authentication

### 2.3 Form Improvements

- Add Formik or React Hook Form for validation
- Add date picker for appointments (react-datepicker)
- Add rich text editor for medical notes
- Add file upload for medical documents

## Phase 3: Authentication & Authorization (Week 3)

### 3.1 Implement JWT Authentication

```typescript
// hms-auth-service
- POST /login → returns JWT token
- POST /register → creates UserAccount + returns JWT
- GET /verify → validates JWT token
```

### 3.2 Add Auth Middleware to API Gateway

```typescript
// Protect all routes except /login, /register
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
  next();
}
```

### 3.3 Role-Based Access Control (RBAC)

- ADMIN: Full access
- DOCTOR: View patients, create encounters, write prescriptions
- NURSE: Check-in patients, record vitals
- RECEPTIONIST: Book appointments, manage patients
- PATIENT: View own records, book appointments

## Phase 4: Additional APIs (Week 4)

### 4.1 Medical Records Service

```
POST   /encounters/:id/vitals        # Add vital signs
POST   /encounters/:id/diagnoses     # Add diagnosis
POST   /encounters/:id/prescriptions # Add medication order
GET    /patients/:id/medical-history # Full history
```

### 4.2 Notification Service

```
POST   /notifications/send           # Send email/SMS
GET    /notifications/preferences    # User preferences
```

### 4.3 Reporting Service

```
GET    /reports/appointments/daily   # Daily appointment report
GET    /reports/patients/new         # New patient registrations
GET    /reports/revenue              # Financial reports
```

## Phase 5: Cloud Deployment (Week 5)

### 5.1 Deploy Each Microservice to Cloud Run

```bash
# Example for patients-service
gcloud run deploy hms-patients-service \
  --image gcr.io/PROJECT/hms-patients-service \
  --region us-central1 \
  --vpc-connector hms-connector
```

### 5.2 Set Up Cloud Load Balancer

- Frontend: Cloud Storage + CDN (static files)
- API Gateway: Cloud Run with custom domain
- Route `/api/patients/*` → patients-service
- Route `/api/doctors/*` → doctors-service
- Route `/api/appointments/*` → appointments-service

### 5.3 Add Cloud Monitoring

- Set up alerts for service downtime
- Monitor response times
- Track error rates

## Phase 6: Testing & Documentation (Week 6)

### 6.1 Add Tests

```
hms-patients-service/
├── __tests__/
│   ├── unit/
│   │   ├── CreatePatientUseCase.test.ts
│   │   └── Patient.test.ts
│   └── integration/
│       └── PatientController.test.ts
```

### 6.2 API Documentation

- Add Swagger/OpenAPI for each service
- Document authentication requirements
- Provide example requests/responses

### 6.3 Update README

- Architecture diagram
- Service endpoints
- Local development setup
- Deployment instructions

## Technical Decisions to Make

1. **API Gateway**: Express proxy vs. dedicated gateway (Kong, Traefik)?
2. **Service Communication**: REST vs. gRPC vs. message queue (RabbitMQ, Kafka)?
3. **Database**: Shared vs. per-service?
4. **Frontend State Management**: Context API vs. Redux vs. Zustand?
5. **Testing Framework**: Jest + Supertest vs. Vitest?

## Migration Strategy

1. **Week 1**: Extract patients-service (smallest, well-defined)
2. **Week 2**: Extract appointments-service + API Gateway
3. **Week 3**: Extract auth-service + add JWT
4. **Week 4**: Extract remaining services
5. **Week 5**: Frontend refactor
6. **Week 6**: Deploy to cloud

## Current Environment Details

### Cloud Deployment

- **Frontend**: https://hms-frontend-591006590099.us-central1.run.app
- **Backend**: https://hms-backend-591006590099.us-central1.run.app
- **Region**: us-central1
- **Database**: Cloud SQL at 10.26.0.3 (private IP)
- **VPC Connector**: hms-connector

### Database Credentials (CHANGE AFTER MIGRATION)

- **Host**: 10.26.0.3 (private)
- **Database**: hms_db
- **User**: hms_user
- **Password**: HMS_Secure_1764897837_Pass

### Local Development

```bash
docker compose up -d
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

## Security Reminders

✅ Database now private (no public IP)
✅ Automated backups enabled (30 days, 7-day PITR)
✅ VPC-protected access
⚠️ Still need to implement JWT authentication
⚠️ Add input validation and sanitization
⚠️ Implement rate limiting on API Gateway
⚠️ Add CORS configuration for production

---

**Ready to start? Run:** `git checkout -b feature/microservices-refactor`

Good luck! 🚀
