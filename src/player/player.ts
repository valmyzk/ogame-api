import { XMLPosition, ReferencedPosition } from "../position/position";
import Planet, { XMLPlayerPlanet, XMLUniversePlanet } from "../planet/planet";
import LazyAlliance, { XMLLazyAlliance } from "../alliance/lazyalliance";
import { Writable, Solo } from "../typings/util";
import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import Alliance from "../alliance/alliance";
import { ExtendedLazyPlayer } from "./lazyplayer";

export default class Player<T extends IDResolvable> {

    public readonly name: string;
    public readonly id: string;

    /**@description playerData's API positions */
    public readonly positions: ReferencedPosition<T, this>[] = [];

    /**@description playerData's API planets */
    public readonly planets: Planet<T>[] = [];

    /**@description playerData's API home planet */
    //@ts-ignore
    public readonly home: Planet<T>;

    /**@description playerData's API alliance */
    public readonly alliance?: LazyAlliance<T>;
    public readonly timestamp: string;
    private syncAllianceId: string | null = null;

    public constructor(encodedData: XMLPlayer, public universe: Universe<T>) {

        this.name = encodedData.name;
        this.id = encodedData.id;
        this.timestamp = encodedData.timestamp;

        this.parsePositions(encodedData.positions.position);
        this.parsePlanets(encodedData.planets.planet);
        this.parseAlliance(encodedData.alliance);
    
    }

    private parsePositions(positions: XMLPosition[]) {

        //Legor
        if(positions) {

            (this as Writable<this>).positions = positions.map(position => {
        
                return new ReferencedPosition<T, this>(position, this.universe, this.timestamp, this);
        
            });
        
        }

    }

    private parsePlanets(planets: Solo<XMLPlayerPlanet>) {

        const planetArray = Array.isArray(planets) ? planets : [planets];

        (this as Writable<this>).planets = planetArray.map(planet => {

            return new Planet(planet, this.universe, this.timestamp, this.id);

        });

        (this as Writable<this>).home = Player.getHomeplanet(this.planets);

    }

    private parseAlliance(alliance?: XMLLazyAlliance) {

        if(alliance) {

            (this as Writable<this>).alliance = new LazyAlliance<T>(alliance, this.universe, this.timestamp);

        }

    }

    public async getStatus() {

        const playerData = await this.universe.getPlayerData();
        const player = playerData.filter(player => player.id === this.id)[0] as ExtendedLazyPlayer<T>;

        return player.status;
    
    }

    /**Prefers ExtendedLazyPlayer's alliance id in case of API desynchronisation */
    public async getSyncAlliance(): Promise<Alliance<T> | undefined> {

        const id = this.syncAllianceId || (this.alliance && this.alliance.id);

        if (id) {

            const data = await this.universe.getAllianceData();
            
            return data.filter(alliance => alliance.id === id)[0] as Alliance<T>;
        
        }
    
    }

    public static getHomeplanet<T extends IDResolvable>(planets: Planet<T>[]) {

        return planets.sort((a, b) => a.id < b.id ? -1 : 1)[0];

    }

}

export interface XMLPlayer extends APIAttributes {
    positions: {
        position: XMLPosition[];
    };

    planets: {
        planet: XMLPlayerPlanet[];
    };

    alliance?: XMLLazyAlliance;
    id: string;
    name: string;
}
