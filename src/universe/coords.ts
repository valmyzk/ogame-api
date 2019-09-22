
/**Utility class for parsing encoded coordinates of type galaxy:system:position 
 * @utility
*/
export class Coords {

    public readonly galaxy: number;
    public readonly system: number;
    public readonly position: number;

    public constructor(encodedData: string);
    public constructor(galaxy: number, system: number, position: number);

    public constructor(arg1: string | number, system?: number, position?: number) {

        const array = typeof arg1 === "string" ? Coords.parseString(arg1) : [arg1, system as number, position as number];
        [this.galaxy, this.position, this.system] = array; 

    }

    /**Converts the coords from an object format to an encoded string */
    public toString() {

        return `${this.galaxy}:${this.system}:${this.position}`;

    };

    /**Replacement of the native Javascript == or === for object deep equals
     * @important Use this instead of Javascript's equality
     */
    public equals(coords: Coords) {

        return coords.galaxy === this.galaxy && coords.system === this.system && coords.position === this.position;

    };

    private static parseString(coords: string) {

        return coords.split(":", 3)
            .map(v => parseInt(v)) as [number, number, number];

    };

    /**Parses an encoded string to a coords object
     * @deprecated
     */
    public static fromString(coords: string) {

        return new Coords(...Coords.parseString(coords));

    }

};