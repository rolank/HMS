import { UserAccount } from "../../domain/entities/UserAccount";

export interface IUserAccountRepository {
  create(account: UserAccount): Promise<void>;
  findByUsername(username: string): Promise<UserAccount | null>;
  findById(id: string): Promise<UserAccount | null>;
}

