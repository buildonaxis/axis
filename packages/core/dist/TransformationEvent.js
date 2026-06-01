export class TransformationEvent {
    eventType = "TransformationEvent";
    eventTime;
    bizStep;
    disposition;
    inputItems;
    outputItems;
    constructor(input) {
        this.eventTime =
            input.eventTime ??
                new Date().toISOString();
        this.bizStep = input.bizStep;
        this.disposition = input.disposition;
        this.inputItems = input.inputItems;
        this.outputItems = input.outputItems;
    }
    get inputEpcs() {
        return this.inputItems
            .map(item => item.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    get outputEpcs() {
        return this.outputItems
            .map(item => item.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    toJSON() {
        return {
            eventType: this.eventType,
            eventTime: this.eventTime,
            bizStep: this.bizStep,
            disposition: this.disposition,
            inputEPCList: this.inputEpcs,
            outputEPCList: this.outputEpcs
        };
    }
}
