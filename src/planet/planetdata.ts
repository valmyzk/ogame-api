import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Planet, { XMLUniversePlanet } from "./planet";
import { Solo } from "../../typings/util";

export default function parseXml<T extends ID>(encodedData: XMLPlanetData, universe: Universe<T>) {

    const planetArray = resolveSolo(encodedData.planet);

    return planetArray.map(planet => 
        
        new Planet(planet, universe, encodedData.timestamp)
        
    ) as Planet<T>[];

}

export interface XMLPlanetData extends APIAttributes {

    planet: Solo<XMLUniversePlanet>;
    
}
