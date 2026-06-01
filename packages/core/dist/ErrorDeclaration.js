export class ErrorDeclaration {
    declarationTime;
    reason;
    correctiveEventIds;
    constructor(input) {
        this.declarationTime = input.declarationTime;
        this.reason = input.reason;
        this.correctiveEventIds = input.correctiveEventIds ?? [];
    }
    toJSON() {
        return {
            declarationTime: this.declarationTime,
            reason: this.reason,
            correctiveEventIds: this.correctiveEventIds
        };
    }
}
