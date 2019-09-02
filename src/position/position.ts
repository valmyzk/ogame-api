import Universe, { ID } from "../universe/universe";
import { PositionType } from "../constenum";

/**Highscore entry
 * @catagory positions
 */
export default class Position<T extends ID> {

    /**Position's type */
    public readonly type: PositionType;

    /**Position's score or value  */
    public readonly score: string;

    /**Position's poisiton in the highscore */
    public readonly position: string;

    /**Amount of ships of a Military Position */
    public readonly ships?: string;

    /**Identifier of the player or alliance */
    public readonly id: string;

    public constructor(encodedData: XMLPosition, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.type = encodedData.type;
        this.score = encodedData.score;
        this.position = encodedData.position;
        this.id = encodedData.id;

        if(encodedData.ships) {

            this.ships = encodedData.ships;

        }
    
    }

};

/**@ignore */
export interface XMLPosition {
    position: string;
    ships?: string;
    type: PositionType;
    score: string;
    id: string;
}

