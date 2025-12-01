export interface BookAppointmentDTO {
  appointmentDate: string;
  reason: string;
  doctorId: string;
  patientId: string;
  bookedById: string;
  bookedByRole: string;
  channel: string;
  createdByUserAccountId: string;
}
