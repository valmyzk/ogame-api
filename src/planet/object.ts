import Universe from "../universe/universe";
import LazyPlayer from "../player/lazyplayer";

/**@ignore */
export default abstract class UniverseObject {

    /**Object's coordinates */
    public readonly coords: string;

    /**Object's identifier */
    public readonly id: string;

    /**Object's name */
    public readonly name: string;

    /**Reference to the object's player */
    public readonly player: LazyPlayer;

    public constructor(encodedData: XMLUniverseObject, public readonly universe: Universe, public readonly timestamp: string) {

        this.coords = encodedData.coords;
        this.id = encodedData.id;
        this.name = encodedData.name;
        this.player = new LazyPlayer(
            universe,
            {
                id: encodedData.player
            },
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
