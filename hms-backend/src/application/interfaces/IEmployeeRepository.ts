export interface EmployeeWithPerson {
  employeeId: string;
  department: string;
  salary: number;
  email: string;
  id?: string;
  person: {
    id: string;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    address: string;
    phone: string;
    emergencyContacts: {
      id: string;
      name: string;
      relation: string;
      phone: string;
    }[];
  };
  doctor?: {
    specialty: string;
    licenseNo: string;
    qualification: string;
  } | null;
}

export interface IEmployeeRepository {
  findAll(): Promise<EmployeeWithPerson[]>;
  create(payload: {
    person: {
      id: string;
      firstName: string;
      lastName: string;
      dob: Date;
      gender: string;
      address: string;
      phone: string;
      emergencyContacts: {
        id: string;
        name: string;
        relation: string;
        phone: string;
      }[];
    };
    employee: {
      employeeId: string;
      department: string;
      salary: number;
      email: string;
    };
  }): Promise<void>;
}
