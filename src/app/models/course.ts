import { User } from "./user";

export interface Course {
  id: number;
  name: string;
  description: string;
  teacher: User;
  students: User[];
}
