import { Universe, ID } from "../universe/universe";
import LazyPlayer from "../player/lazyplayer";
import { UniverseCoords } from "../universe/coords";

export default abstract class UniverseObject<T extends ID> {

    public readonly coords: UniverseCoords<T>;
    public readonly id: string;
    public readonly name: string;
    public readonly player: LazyPlayer<T>;

    public constructor(encodedData: XMLUniverseObject, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.coords = UniverseCoords.parse(encodedData.coords, universe);
        this.id = encodedData.id;
        this.name = encodedData.name;
        this.player = new LazyPlayer<T>(
            universe,
            {
                id: encodedData.player
            },
            timestamp
        );
    
    }

}

export interface XMLUniverseObject {
    id: string;
    player: string;
    name: string;
    coords: string;
}
