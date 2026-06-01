export class EpcisBody {
    events;
    constructor(input = {}) {
        this.events = input.events ?? [];
    }
    addEvent(event) {
        return new EpcisBody({
            events: [...this.events, event]
        });
    }
    toJSON() {
        return {
            eventList: this.events.map((event) => event.toJSON())
        };
    }
}
