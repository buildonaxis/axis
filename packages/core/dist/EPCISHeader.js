export class EpcisHeader {
    masterData;
    constructor(input = {}) {
        this.masterData = input.masterData;
    }
    toJSON() {
        return {
            epcisMasterData: this.masterData?.toJSON()
        };
    }
}
