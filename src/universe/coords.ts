import { IDResolvable, Universe } from "./universe";

export class Coords {

    public constructor(public readonly galaxy: number, public readonly system: number, public readonly position: number) {}

    public toString(): string {

        return `${this.galaxy}:${this.system}:${this.position}`;

    };

    public equals(coords: Coords): boolean {

        return coords.galaxy === this.galaxy && coords.system === this.system && coords.position === this.position;

    };

    public static fromString(coords: string): Coords {

        const split = coords.split(":", 3)
            .map(v => parseInt(v)) as [number, number, number];

        return new Coords(...split);

    };

};

export class UniverseCoords<T extends IDResolvable> extends Coords {

    public constructor(public readonly galaxy: number, public readonly system: number, public readonly position: number, public readonly universe: Universe<T>) {

        super(galaxy, system, position);

    };

    public static parse<T extends IDResolvable>(coords: string, universe: Universe<T>): UniverseCoords<T> {

        const split = coords.split(":", 3)
            .map(v => parseInt(v)) as [number, number, number];

        
        //#28010
        //@ts-ignore
        return new UniverseCoords<T>(...split, universe);

    };

};