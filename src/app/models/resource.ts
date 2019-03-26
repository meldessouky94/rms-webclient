
import { Building } from './building';
export class Resource {
    id: number;
    type: string;
    building: Building;
    buildingId: number;
    name: string;
    disabled: boolean;
    inactive: boolean;
    retired: boolean;
    availableStartDate: string;
    reservableAfter: string;
    reservableBefore: string;
    availableDays: string[];
    hasEthernet: boolean;
    hasComputer: boolean;
    numberOfOutlets: number;
    hasMicrophone: boolean;

    constructor() {}
}
