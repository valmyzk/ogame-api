
/**Utility class for parsing encoded coordinates of type galaxy:system:position 
 * @utility
*/
export class Coords {

    public constructor(public readonly galaxy: number, public readonly system: number, public readonly position: number) {}

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

    /**Parses an encoded string to a coords object
     * @todo Replace with constructor overloading
     */
    public static fromString(coords: string) {

        const split = coords.split(":", 3)
            .map(v => parseInt(v)) as [number, number, number];

        return new Coords(...split);

    };

};