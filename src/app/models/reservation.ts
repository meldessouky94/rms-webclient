import { Resource } from './resource';

export class Reservation {
    id: number;
    purpose: string;
    startTime: string;
    endTime: string;
    resource: Resource;
    userEmail: string;
    cancelled: boolean;
    approved: boolean;

    constructor() {}
}
