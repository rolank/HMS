#!/bin/bash

echo "Creating DDD folder structure..."

# ==========================
# DOMAIN LAYER
# ==========================

mkdir -p src/domain/common
touch src/domain/common/types.ts
touch src/domain/common/enums.ts

mkdir -p src/domain/value-objects
touch src/domain/value-objects/EmergencyContact.ts

mkdir -p src/domain/entities
touch src/domain/entities/Person.ts
touch src/domain/entities/Employee.ts
touch src/domain/entities/Doctor.ts
touch src/domain/entities/Patient.ts
touch src/domain/entities/UserAccount.ts
touch src/domain/entities/Appointment.ts
touch src/domain/entities/Encounter.ts
touch src/domain/entities/MedicalRecord.ts
touch src/domain/entities/VitalSign.ts
touch src/domain/entities/Observation.ts
touch src/domain/entities/Diagnosis.ts
touch src/domain/entities/Order.ts
touch src/domain/entities/MedicationOrder.ts

mkdir -p src/domain/events
touch src/domain/events/AppointmentCheckedIn.ts
touch src/domain/events/EventBus.ts

mkdir -p src/domain/notifications
touch src/domain/notifications/NotificationPreference.ts
touch src/domain/notifications/NotificationRequest.ts
touch src/domain/notifications/NotificationRouter.ts
touch src/domain/notifications/NotificationService.ts

# ==========================
# APPLICATION LAYER
# ==========================

mkdir -p src/application/interfaces
touch src/application/interfaces/IPatientRepository.ts
touch src/application/interfaces/IAppointmentRepository.ts

mkdir -p src/application/usecases/patients
touch src/application/usecases/patients/CreatePatientUseCase.ts
touch src/application/usecases/patients/GetPatientUseCase.ts
touch src/application/usecases/patients/ListPatientsUseCase.ts

mkdir -p src/application/usecases/appointments
touch src/application/usecases/appointments/BookAppointmentUseCase.ts
touch src/application/usecases/appointments/CheckInAppointmentUseCase.ts
touch src/application/usecases/appointments/ListAppointmentsUseCase.ts

# ==========================
# INFRASTRUCTURE LAYER
# ==========================

mkdir -p src/infrastructure/prisma
touch src/infrastructure/prisma/PrismaPatientRepository.ts
touch src/infrastructure/prisma/PrismaAppointmentRepository.ts

mkdir -p src/infrastructure/mappers
touch src/infrastructure/mappers/PatientMapper.ts
touch src/infrastructure/mappers/AppointmentMapper.ts

# ==========================
# INTERFACES LAYER
# ==========================

mkdir -p src/interfaces/http/controllers
touch src/interfaces/http/controllers/PatientController.ts
touch src/interfaces/http/controllers/AppointmentController.ts

mkdir -p src/interfaces/http/routes
touch src/interfaces/http/routes/patient.routes.ts
touch src/interfaces/http/routes/appointment.routes.ts
touch src/interfaces/http/routes/index.ts

mkdir -p src/interfaces/dtos
touch src/interfaces/dtos/CreatePatientDTO.ts
touch src/interfaces/dtos/BookAppointmentDTO.ts

mkdir -p src/interfaces/middleware
touch src/interfaces/middleware/errorHandler.ts
touch src/interfaces/middleware/notFound.ts

# ==========================
# ROOT FILES
# ==========================

touch src/app.ts
touch src/server.ts

mkdir -p src/config
touch src/config/env.ts
touch src/config/prisma.ts

echo "DDD folder structure created successfully!"
