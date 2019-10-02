import Universe from "../universe/universe";
import { XMLUniversePlanet } from "./planet";
import UniverseObject, { XMLUniverseObject } from "./object";

/**Planet's moon
 * @category planet
 */
export default class Moon extends UniverseObject {

    /**Moon's size */
    public readonly size: string;

    public constructor(encodedData: XMLMoon, planet: XMLUniversePlanet, universe: Universe, timestamp: string) {

        (encodedData as XMLMoon & XMLUniverseObject).coords = planet.coords;
        (encodedData as XMLMoon & XMLUniverseObject).player = planet.player;

        super(encodedData as unknown as XMLUniverseObject, universe, timestamp);
        this.size = encodedData.size;
    
    }

}

/**@ignore */
export interface XMLMoon {
    id: string;
    name: string;
    size: string;
}
