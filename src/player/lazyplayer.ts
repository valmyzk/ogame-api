import { Universe } from "../universe/universe";

/**Player Reference
 * @category player
 */
export class LazyPlayer {

    public readonly id: string;
    public readonly universe: Universe;
    public readonly timestamp: string;

    public constructor(universe: Universe, data: XMLLazyPlayer, timestamp: string) {

        this.id = data.id;
        this.universe = universe;
        this.timestamp = timestamp;
    
    }

    public getPlayer = () => this.universe.getPlayer(this.id);

}

/**Player reference with additional features such as status, alliance and name
 * @category player
 */
export class ExtendedLazyPlayer extends LazyPlayer {

    /**Player's name */
    public readonly name: string;

    /**Player's alliance */
    public readonly allianceId?: string;

    /**Player's account status */
    public readonly status?: string;

    public constructor(universe: Universe, data: XMLExtendedLazyPlayer, timestamp: string) {

        super(universe, data, timestamp);
        this.name = data.name;

        this.allianceId = data.alliance;
        this.status = data.status;
    
    }

}

/**@ignore */
export interface XMLExtendedLazyPlayer extends XMLLazyPlayer {
    name: string;
    alliance?: string;
    status?: string;
}

/**@ignore */
export interface XMLLazyPlayer {
    id: string;
}