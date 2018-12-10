export class Resource {
    id: number;
    name: string;
    buildingId: number;
    type: string;
    enabled: boolean;
    retired: boolean;
    availableStartDate: string;
    reservableAfter: string;
    reservableBefore: string;
    availableDays: Array<string>;
    hasEthernet: boolean;
    hasComputer: number;
    numberOfOutlets: boolean;
    hasMicrophone: boolean;

    constructor() {}
}
