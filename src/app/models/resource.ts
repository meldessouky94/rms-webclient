export class Resource {
    id: number;
    name: string;
    buildingId: number;
    resourceId: number;
    type: string;
    enabled: boolean;
    retired: boolean;
    availableStartDate: string;
    reservableAfter: string;
    reservableBefore: string;
    availableDays: Array<string>;
    hasEthernet: boolean;
    hasComputer: boolean;
    numberOfOutlets: number;
    hasMicrophone: boolean;

    constructor() {}
}
