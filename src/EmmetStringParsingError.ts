export class EmmetStringParsingError extends Error {
    public readonly position: number;

    constructor(message: string, position?: number) {
        super(message);
        this.position = position;
    }
}
