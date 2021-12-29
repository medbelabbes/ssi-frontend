import {Role} from "./Role.model";

export class User {
  id?: number;
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  status: string = '';
  tasks?: Task[] = [];
  roles?: Role[] = [];
}
