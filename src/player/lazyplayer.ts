import Player, { XMLPlayer } from "./player";
import Universe, { ID } from "../universe/universe";

/**@description Player Reference */
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

/**@description Player reference with additional features such as status and alliance */
export class ExtendedLazyPlayer<T extends ID> extends LazyPlayer<T> {

    public readonly name: string;
    public readonly allianceId?: string;
    public readonly status?: string;

    public constructor(universe: Universe<T>, data: XMLExtendedLazyPlayer, timestamp: string) {

        super(universe, data, timestamp);
        this.name = data.name;

        this.allianceId = data.alliance;
        this.status = data.status;
    
    }

}

export interface XMLExtendedLazyPlayer extends XMLLazyPlayer {
    name: string;
    alliance?: string;
    status?: string;
}

export interface XMLLazyPlayer {
    id: string;
}
