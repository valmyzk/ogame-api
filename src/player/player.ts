import { Position, XMLPosition } from "../position/position";
import { Planet, XMLPlayerPlanet } from "../planet/planet";
import { LazyAlliance, XMLLazyAlliance } from "../alliance/lazyalliance";
import { Solo } from "../../typings/util";
import { Universe } from "../universe/universe";
import { PlayerReference } from "./lazyplayer";
import { APIAttributes, resolveSolo } from "../xml";

/**@category player */
export class Player {

    /**Player's name */
    public readonly name: string;

    /**Player's identifier */
    public readonly id: string;

    /**Player positions tuple. Index 3 will always be a military position */
    public readonly positions: PlayerPositions;

    /**Player's planets. First element will always be the homeplanet */
    public readonly planets: Planet[];

    /**Reference to the player's alliance. May be undefined */
    public readonly alliance?: LazyAlliance;

    /**UNIX timestamp of when the object was parsed */
    public readonly timestamp: string;

    public constructor(encodedData: XMLPlayer, public universe: Universe) {

        this.name = encodedData.name;
        this.id = encodedData.id;
        this.timestamp = encodedData.timestamp;

        this.positions = this.parsePositions(encodedData.positions.position) as PlayerPositions;
        this.planets = this.parsePlanets(encodedData.planets.planet);
        this.alliance = this.parseAlliance(encodedData.alliance);
    
    }

    private parsePositions(positions?: XMLPlayerPosition[]) {

        return positions && positions.map(playerPosition => {
        
            (playerPosition as unknown as XMLPosition).position = playerPosition.text;
            (playerPosition as unknown as XMLPosition).id = this.id;

            return new Position(playerPosition as unknown as XMLPosition, this.universe, this.timestamp);
        
        }) as PlayerPositions;

    }

    private parsePlanets(planets: Solo<XMLPlayerPlanet>): Planet[] {

        const planetArray = resolveSolo(planets)
                .sort((a, b) => a < b ? -1 : 1);

        return planetArray.map(planet => {

            return new Planet(planet, this.universe, this.timestamp, this.id);

        }) as Planet[];

    }

    private parseAlliance(alliance?: XMLLazyAlliance) {

        return alliance && new LazyAlliance(alliance, this.universe, this.timestamp);

    }

    /**@returns Player's account status */
    public async getStatus() {

        const playerData = await this.universe.getPlayers();
        const player = playerData.filter(player => player.id === this.id)[0] as PlayerReference;

        return (player && player.status) || "";
    
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
export type MilitaryPosition = Position & XMLMilitaryPlayerPosition;

type PlayerPositions = [Position, Position, Position, MilitaryPosition, Position, Position, Position];