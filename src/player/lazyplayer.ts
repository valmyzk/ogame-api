import Universe, { ID } from "../universe/universe";

/**Player Reference
 * @category player
 */
export default class LazyPlayer<T extends ID> {

    public readonly id: string;
    public readonly universe: Universe<T>;
    public readonly timestamp: string;

    public constructor(universe: Universe<T>, data: XMLLazyPlayer, timestamp: string) {

        this.id = data.id;
        this.universe = universe;
        this.timestamp = timestamp;
    
    }

    public getPlayer = () => this.universe.getPlayer(this.id);

}

/**Player reference with additional features such as status, alliance and name
 * @category player
 */
export class ExtendedLazyPlayer<T extends ID> extends LazyPlayer<T> {

    /**Player's name */
    public readonly name: string;

    /**Player's alliance */
    public readonly allianceId?: string;

    /**Player's account status */
    public readonly status?: string;

    public constructor(universe: Universe<T>, data: XMLExtendedLazyPlayer, timestamp: string) {

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