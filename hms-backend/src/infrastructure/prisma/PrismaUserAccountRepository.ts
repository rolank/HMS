import prisma from "../../config/prisma";
import { IUserAccountRepository } from "../../application/interfaces/IUserAccountRepository";
import { UserAccount } from "../../domain/entities/UserAccount";
import { Person } from "../../domain/entities/Person";
import { AccountStatus } from "../../domain/common/enums";

export class PrismaUserAccountRepository implements IUserAccountRepository {
  async create(account: UserAccount): Promise<void> {
    await prisma.userAccount.create({
      data: {
        id: account.getId(),
        username: account.getUsername(),
        passwordHash: account.getPasswordHash(),
        status: account.getStatus(),
        owner: {
          create: {
            id: account.getOwner().getId(),
            firstName: account.getOwner().getFirstName(),
            lastName: account.getOwner().getLastName(),
            dob: account.getOwner().getDob(),
            gender: account.getOwner().getGender(),
            address: account.getOwner().getAddress(),
            phone: account.getOwner().getPhone()
          }
        }
      }
    });
  }

  async findByUsername(username: string): Promise<UserAccount | null> {
    const d = await prisma.userAccount.findUnique({
      where: { username },
      include: { owner: true }
    });
    if (!d) return null;

    const person = new Person(
      d.owner.id,
      d.owner.firstName,
      d.owner.lastName,
      d.owner.dob,
      d.owner.gender,
      d.owner.address,
      d.owner.phone,
      []
    );

    return new UserAccount(
      d.id,
      d.username,
      d.passwordHash,
      d.status as AccountStatus,
      person,
      d.lastLoginAt
    );
  }

  async findById(id: string): Promise<UserAccount | null> {
    const d = await prisma.userAccount.findUnique({
      where: { id },
      include: { owner: true }
    });
    if (!d) return null;

    const person = new Person(
      d.owner.id,
      d.owner.firstName,
      d.owner.lastName,
      d.owner.dob,
      d.owner.gender,
      d.owner.address,
      d.owner.phone,
      []
    );

    return new UserAccount(
      d.id,
      d.username,
      d.passwordHash,
      d.status as AccountStatus,
      person,
      d.lastLoginAt
    );
  }

  async findAll(): Promise<UserAccount[]> {
    const list = await prisma.userAccount.findMany({
      include: { owner: true }
    });

    return list.map((d) => {
      const person = new Person(
        d.owner.id,
        d.owner.firstName,
        d.owner.lastName,
        d.owner.dob,
        d.owner.gender,
        d.owner.address,
        d.owner.phone,
        []
      );

      return new UserAccount(
        d.id,
        d.username,
        d.passwordHash,
        d.status as AccountStatus,
        person,
        d.lastLoginAt
      );
    });
  }
}
