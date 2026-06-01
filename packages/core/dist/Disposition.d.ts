export declare const Disposition: {
    readonly ACTIVE: "active";
    readonly IN_TRANSIT: "in_transit";
    readonly IN_PROGRESS: "in_progress";
    readonly RECEIVED: "received";
    readonly DESTROYED: "destroyed";
};
export type Disposition = typeof Disposition[keyof typeof Disposition];
