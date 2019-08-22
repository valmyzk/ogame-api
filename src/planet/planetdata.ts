import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import Planet, { XMLPlanet, XMLUniversePlanet } from "./planet";
import { Writable } from "../typings/util";

export default class PlanetData<T extends IDResolvable> {

    public readonly planets: Planet<T>[] = [];
    public readonly timestamp: string;

    public constructor(encodedData: XMLPlanetData, public readonly universe: Universe<T>) {

        this.timestamp = encodedData.timestamp;
        this.parsePlanets(encodedData.planet, encodedData.timestamp);
    
    }

    private parsePlanets(planets: XMLUniversePlanet[], timestamp: string): void {

        (this as Writable<this>).planets = planets.map(planet => {

            return new Planet(planet, this.universe, timestamp);

        });

    }

    public getPlanetById(id: string): Planet<T> {

        return this.planets.filter(v => v.id === id)[0];
    
    }

    public getPlanetsByName(name: string): Planet<T>[] {

        return this.planets.filter(v => v.name === name);
    
    }

}

export interface XMLPlanetData extends APIAttributes {
    planet: XMLUniversePlanet[];
}
