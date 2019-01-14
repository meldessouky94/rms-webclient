export class Event {

  id: number;
  purpose: string;
  resource: any;
  startTime: Date;
  endTime: Date;
  resourceId: number;
  userId: string;
  cancelled: boolean;
  approved: boolean;
  reminderTime: number;
}
