import { Universe } from "../universe/universe";
import { Planet, XMLUniversePlanet } from "./planet";
import { Solo } from "../../typings/util";
import { resolveSolo, APIAttributes } from "../xml";

/**Parses XML Localization root file to a Planet array
 * @category planet
 */
export function parseXml(encodedData: XMLPlanetData, universe: Universe) {

    const planetArray = resolveSolo(encodedData.planet);

    return planetArray.map(planet => 
        
        new Planet(planet, universe, encodedData.timestamp)
        
    ) as Planet[];

}

/**@ignore */
export interface XMLPlanetData extends APIAttributes {

    planet: Solo<XMLUniversePlanet>;
    
}
