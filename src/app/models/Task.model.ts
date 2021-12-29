import {User} from "./User.model";


export class Task {
  id?: number;
  name: string = '';
  description: string = '';
  priority: string = '';
  currentStatus: string = '';
  dueDate: string = '';
  tags: Tag[] = []
  estimateTime: number = 0;
  sprintPoints: number = 0;
  activities: Activity[] = []
}

export  class Tag {
  id?: number;
  name: string = '';
}

export class Activity {
  id?: number;
  newStatus: string = '';
  user: User = new User();
  modifiedAt: string = ''
}
