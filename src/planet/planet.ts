import { UniverseObject, XMLUniverseObject } from "./object";
import { Universe } from "../universe/universe";
import { Moon, XMLMoon } from "./moon";

/**@category planet */
export class Planet extends UniverseObject {

    /**Planet's moon */
    public readonly moon?: Moon;

    public constructor(encodedData: XMLUniversePlanet, universe: Universe, timestamp: string);
    public constructor(encodedData: XMLPlayerPlanet, universe: Universe, timestamp: string, player: string);

    public constructor(encodedData: XMLUniversePlanet, universe: Universe, timestamp: string, player?: string) {

        encodedData.player = encodedData.player || player as string; 

        super(encodedData, universe, timestamp);

        if (encodedData.moon) {

            this.moon = new Moon(encodedData.moon, encodedData, this.universe, timestamp);
        
        }
    
    }

}

export interface XMLUniversePlanet extends XMLUniverseObject {

    moon?: XMLMoon;

}

export type XMLPlayerPlanet = Omit<XMLUniversePlanet, "player">;
export type XMLPlanet = XMLUniversePlanet | XMLPlayerPlanet;