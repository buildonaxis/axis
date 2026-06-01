export interface ErrorDeclarationInput {
  declarationTime: string;
  reason: string;
  correctiveEventIds?: string[];
}

export class ErrorDeclaration {
  readonly declarationTime: string;
  readonly reason: string;
  readonly correctiveEventIds: string[];

  constructor(input: ErrorDeclarationInput) {
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