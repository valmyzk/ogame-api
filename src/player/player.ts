import Position, { XMLPosition } from "../position/position";
import Planet, { XMLPlayerPlanet } from "../planet/planet";
import LazyAlliance, { XMLLazyAlliance } from "../alliance/lazyalliance";
import { Solo } from "../../typings/util";
import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import { ExtendedLazyPlayer } from "./lazyplayer";

/**@category player */
export default class Player<T extends ID> {

    /**Player's name */
    public readonly name: string;

    /**Player's identifier */
    public readonly id: string;

    /**Player positions tuple. Index 3 will always be a military position */
    public readonly positions: PlayerPositions<T>;

    /**Player's planets. First element will always be the homeplanet */
    public readonly planets: Planet<T>[];
    public readonly home: Planet<T>;

    /**Reference to the player's alliance. May be undefined */
    public readonly alliance?: LazyAlliance<T>;

    /**UNIX timestamp of when the object was parsed */
    public readonly timestamp: string;

    public constructor(encodedData: XMLPlayer, public universe: Universe<T>) {

        this.name = encodedData.name;
        this.id = encodedData.id;
        this.timestamp = encodedData.timestamp;

        this.positions = this.parsePositions(encodedData.positions.position) as PlayerPositions<T>;
        this.planets = this.parsePlanets(encodedData.planets.planet);
        this.home = Player.getHomeplanet(this.planets);
        this.alliance = this.parseAlliance(encodedData.alliance);
    
    }

    private parsePositions(positions?: XMLPlayerPosition[]) {

        return positions && positions.map(playerPosition => {
        
            (playerPosition as unknown as XMLPosition).position = playerPosition.text;
            (playerPosition as unknown as XMLPosition).id = this.id;

            return new Position<T>(playerPosition as unknown as XMLPosition, this.universe, this.timestamp);
        
        }) as PlayerPositions<T>;

    }

    private parsePlanets(planets: Solo<XMLPlayerPlanet>): Planet<T>[] {

        const planetArray = resolveSolo(planets);

        return planetArray.map(planet => {

            return new Planet(planet, this.universe, this.timestamp, this.id);

        }) as Planet<T>[];

    }

    private parseAlliance(alliance?: XMLLazyAlliance) {

        return alliance && new LazyAlliance<T>(alliance, this.universe, this.timestamp);

    }

    /**@returns Player's account status */
    public async getStatus() {

        const playerData = await this.universe.getPlayerData();
        const player = playerData.filter(player => player.id === this.id)[0] as ExtendedLazyPlayer<T>;

        return player.status;
    
    }

    /**@returns Earliest created planet of an array */
    public static getHomeplanet<T extends ID>(planets: Planet<T>[]) {

        return planets.sort((a, b) => a.id < b.id ? -1 : 1)[0];

    }

}

/**@ignore */
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

/**@ignore */
export interface XMLPlayerPosition {

    text: string;
    type: string;
    score: string;

};

/**@ignore */
export interface XMLMilitaryPlayerPosition extends XMLPosition {

    ships: string;

}

/**@ignore */
export type MilitaryPosition<T extends ID> = Position<T> & XMLMilitaryPlayerPosition;

type PlayerPositions<T extends ID> = [Position<T>, Position<T>, Position<T>, MilitaryPosition<T>, Position<T>, Position<T>, Position<T>];