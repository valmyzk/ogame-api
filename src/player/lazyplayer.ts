import { Universe } from "../universe/universe";

/**Player Reference
 * @category player

 */
export class LazyPlayerReference {

    public readonly id: string;

    public constructor(data: XMLLazyPlayerReference, public readonly universe: Universe, public readonly timestamp: string) {

        this.id = data.id;
    
    }

}

/**Player reference with additional features such as status, alliance and name
 * @category player
 */
export class PlayerReference extends LazyPlayerReference {

    /**Player's name */
    public readonly name: string;

    /**Player's alliance */
    public readonly allianceId?: string;

    /**Player's account status */
    public readonly status?: string;

    public constructor(universe: Universe, data: XMLPlayerReference, timestamp: string) {

        super(data, universe, timestamp);
        this.name = data.name;

        this.allianceId = data.alliance;
        this.status = data.status;
    
    }

}


/**@ignore */
export interface XMLPlayerReference extends XMLLazyPlayerReference {
    name: string;
    alliance?: string;
    status?: string;
}

/**@ignore */
export interface XMLLazyPlayerReference {
    id: string;
}