import { Universe } from "../universe/universe";
import { LazyPlayerReference } from "../player/lazyplayer";

/**@ignore */
export abstract class UniverseObject {

    /**Object's coordinates */
    public readonly coords: string;

    /**Object's identifier */
    public readonly id: string;

    /**Object's name */
    public readonly name: string;

    /**Reference to the object's player */
    public readonly player: LazyPlayerReference;

    public constructor(encodedData: XMLUniverseObject, public readonly universe: Universe, public readonly timestamp: string) {

        this.coords = encodedData.coords;
        this.id = encodedData.id;
        this.name = encodedData.name;
        this.player = new LazyPlayerReference(
            {
                id: encodedData.player
            },
            universe,
            timestamp
        );
    
    }

}

/**@ignore */
export interface XMLUniverseObject {
    id: string;
    player: string;
    name: string;
    coords: string;
}
