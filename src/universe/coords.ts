export class Coords {

    public constructor(public readonly galaxy: number, public readonly system: number, public readonly position: number) {}

    public toString() {

        return `${this.galaxy}:${this.system}:${this.position}`;

    };

    public equals(coords: Coords) {

        return coords.galaxy === this.galaxy && coords.system === this.system && coords.position === this.position;

    };

    public static fromString(coords: string) {

        const split = coords.split(":", 3)
            .map(v => parseInt(v)) as [number, number, number];

        return new Coords(...split);

    };

};