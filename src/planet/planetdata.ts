import { Universe, ID, APIAttributes, resolveSolo } from "../universe/universe";
import Planet, { XMLUniversePlanet } from "./planet";

export default class {

    private static parseXml<T extends ID>(encodedData: XMLPlanetData, universe: Universe<T>) {

        const planetArray = resolveSolo(encodedData.planet);

        return planetArray.map(planet => 
            
            new Planet(planet, universe, encodedData.timestamp)
            
        );

    }

}

export interface XMLPlanetData extends APIAttributes {
    planet: XMLUniversePlanet[];
}
