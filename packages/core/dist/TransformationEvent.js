import { SerializedItem } from "./SerializedItem.js";
function itemFromEpcUri(epc) {
    const prefix = "urn:epc:id:sgtin:";
    const value = epc.startsWith(prefix)
        ? epc.slice(prefix.length)
        : epc;
    const [gtin, serial] = value.split(".");
    return new SerializedItem({
        raw: epc,
        identifierType: "serialized",
        gtin,
        serial
    });
}
export class TransformationEvent {
    eventType = "TransformationEvent";
    eventTime;
    bizStep;
    disposition;
    inputItems;
    outputItems;
    constructor(input) {
        this.eventTime =
            input.eventTime ?? new Date().toISOString();
        this.bizStep = input.bizStep;
        this.disposition = input.disposition;
        this.inputItems = input.inputItems;
        this.outputItems = input.outputItems;
    }
    get inputEpcs() {
        return this.inputItems
            .map((item) => item.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    get outputEpcs() {
        return this.outputItems
            .map((item) => item.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    static parse(input) {
        if (typeof input !== "object" ||
            input === null) {
            throw new Error("Invalid TransformationEvent");
        }
        const event = input;
        return new TransformationEvent({
            eventTime: event.eventTime,
            bizStep: event.bizStep,
            disposition: event.disposition,
            inputItems: (event.inputEPCList ?? []).map((epc) => itemFromEpcUri(epc)),
            outputItems: (event.outputEPCList ?? []).map((epc) => itemFromEpcUri(epc))
        });
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
