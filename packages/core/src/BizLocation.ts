import { Location } from "./Location.js";

export class BizLocation {
  readonly location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  get id(): string {
    return this.location.toSgln();
  }

  toJSON() {
    return {
      id: this.id
    };
  }
}