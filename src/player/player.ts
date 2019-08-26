import Position, { XMLPosition } from "../position/position";
import Planet, { XMLPlayerPlanet } from "../planet/planet";
import LazyAlliance, { XMLLazyAlliance } from "../alliance/lazyalliance";
import { Writable, Solo } from "../../typings/util";
import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Alliance from "../alliance/alliance";
import { ExtendedLazyPlayer } from "./lazyplayer";

export default class Player<T extends ID> {

    public readonly name: string;
    public readonly id: string;
    public readonly positions!: PlayerPositions<T>;
    public readonly planets: Planet<T>[] = [];
    public readonly home!: Planet<T>;
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

    private parsePositions(positions: XMLPlayerPosition[]) {

        (this as Writable<this>).positions = positions && positions.map(playerPosition => {
        
            (playerPosition as unknown as XMLPosition).position = playerPosition.text;

            return new Position<T>(playerPosition as unknown as XMLPosition, this.universe, this.timestamp);
        
        }) as PlayerPositions<T>;

    }

    private parsePlanets(planets: Solo<XMLPlayerPlanet>) {

        const planetArray = resolveSolo(planets);

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

    public static getHomeplanet<T extends ID>(planets: Planet<T>[]) {

        return planets.sort((a, b) => a.id < b.id ? -1 : 1)[0];

    }

}

export interface XMLPlayer extends APIAttributes {
    positions: {
        position: XMLPlayerPosition[];
    };

    planets: {
        planet: Solo<XMLPlayerPlanet>;
    };

    alliance?: XMLLazyAlliance;
    id: string;
    name: string;
}

export interface XMLPlayerPosition {

    text: string;
    type: string;
    score: string;

};

export interface XMLMilitaryPlayerPosition extends XMLPosition {

    ships: string;

}

export type MilitaryPosition<T extends ID> = Position<T> & XMLMilitaryPlayerPosition;
type PlayerPositions<T extends ID> = [Position<T>, Position<T>, Position<T>, MilitaryPosition<T>, Position<T>, Position<T>, Position<T>];