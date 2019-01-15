import { Resource } from './resource';
import { User } from './user';

export class CustomCalendarEvent {

  id: string | number;
  purpose: string;
  resource: Resource;
  startTime: Date;
  endTime: Date;
  resourceId: number;
  userId: string;
  user: User;
  cancelled: boolean;
  approved: boolean;
  reminderTime: number;
}
