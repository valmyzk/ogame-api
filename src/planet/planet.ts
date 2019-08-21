import UniverseObject, { XMLUniverseObject } from "./object";
import { Universe, IDResolvable } from "../universe/universe";
import Moon, { XMLMoon } from "./moon";

export default class Planet<T extends IDResolvable> extends UniverseObject<T> {

    public readonly moon?: Moon<T>;

    public constructor(encodedData: XMLPlanet, universe: Universe<T>, timestamp: string) {

        super(encodedData, universe, timestamp);

        if (encodedData.moon) {

            this.moon = new Moon(encodedData.moon, encodedData, this.universe, timestamp);
        
        }
    
    }

}

export interface XMLPlanet extends XMLUniverseObject {
    moon?: XMLMoon;
}
