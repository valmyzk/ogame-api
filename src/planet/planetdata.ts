import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Planet, { XMLUniversePlanet } from "./planet";
import { Solo } from "../../typings/util";

/**Parses XML Localization root file to a Planet array
 * @category planet
 */
export default function parseXml<T extends ID>(encodedData: XMLPlanetData, universe: Universe<T>) {

    const planetArray = resolveSolo(encodedData.planet);

    return planetArray.map(planet => 
        
        new Planet(planet, universe, encodedData.timestamp)
        
    ) as Planet<T>[];

}

/**@internal */
export interface XMLPlanetData extends APIAttributes {

    planet: Solo<XMLUniversePlanet>;
    
}
