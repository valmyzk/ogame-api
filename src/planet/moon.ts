import Universe, { ID } from "../universe/universe";
import { XMLUniversePlanet } from "./planet";
import UniverseObject, { XMLUniverseObject } from "./object";

export default class Moon<T extends ID> extends UniverseObject<T> {

    public readonly size: string;

    public constructor(encodedData: XMLMoon, planet: XMLUniversePlanet, universe: Universe<T>, timestamp: string) {

        (encodedData as XMLMoon & XMLUniverseObject).coords = planet.coords;
        (encodedData as XMLMoon & XMLUniverseObject).player = planet.player;

        super(encodedData as unknown as XMLUniverseObject, universe, timestamp);
        this.size = encodedData.size;
    
    }

}

export interface XMLMoon {
    id: string;
    name: string;
    size: string;
}
