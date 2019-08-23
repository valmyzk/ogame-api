import UniverseObject, { XMLUniverseObject } from "./object";
import { Universe, ID } from "../universe/universe";
import Moon, { XMLMoon } from "./moon";

export default class Planet<T extends ID> extends UniverseObject<T> {

    public readonly moon?: Moon<T>;

    public constructor(encodedData: XMLUniversePlanet, universe: Universe<T>, timestamp: string);
    public constructor(encodedData: XMLPlayerPlanet, universe: Universe<T>, timestamp: string, player: string);

    public constructor(encodedData: XMLPlanet, universe: Universe<T>, timestamp: string, player?: string) {

        (encodedData as XMLUniversePlanet).player = (encodedData as XMLUniversePlanet).player || player as string; 

        super(encodedData as XMLUniversePlanet, universe, timestamp);

        if (encodedData.moon) {

            this.moon = new Moon(encodedData.moon, encodedData as XMLUniversePlanet, this.universe, timestamp);
        
        }
    
    }

}

export interface XMLUniversePlanet extends XMLUniverseObject {

    moon?: XMLMoon;

}

export type XMLPlayerPlanet = Omit<XMLUniversePlanet, "player">;
export type XMLPlanet = XMLUniversePlanet | XMLPlayerPlanet;