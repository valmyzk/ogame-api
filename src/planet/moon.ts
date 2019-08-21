import { Universe, IDResolvable } from "../universe/universe";
import { XMLPlanet } from "./planet";
import UniverseObject from "./object";

export default class Moon<T extends IDResolvable> extends UniverseObject<T> {

    public readonly size: string;

    public constructor(encodedData: XMLMoon, planet: XMLPlanet, universe: Universe<T>, timestamp: string) {

        super(planet, universe, timestamp);
        this.size = encodedData.size;
    
    }

}

export interface XMLMoon {
    id: string;
    name: string;
    size: string;
}
