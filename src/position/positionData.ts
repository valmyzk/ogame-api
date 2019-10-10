import { Universe } from "../universe/universe";
import { Position, PositionType, XMLPosition, PositionCategory } from "./position";
import { Solo } from "../../typings/util";
import { XMLMilitaryPlayerPosition, MilitaryPosition } from "../player/player";
import { resolveSolo, APIAttributes } from "../xml";

/**Parses XML Position root file to a Position array
 * @category positions
 */
export function parseXml<C extends PositionCategory, K extends PositionType>(encodedData: XMLPositionData<C, K>, universe: Universe) {
    
    const array = resolveSolo(encodedData.player) as unknown as XMLPositionFetch<C, K>[];

    return array.map(position => 

        new Position({

            score: position.score,
            position: position.position,
            type: encodedData.type,
            ships: position.ships,
            id: position.id

        }, universe, encodedData.timestamp)

    ) as PositionFetch<C, K>[];

};

type XMLPositionFetch<C extends PositionCategory, K extends PositionType> = C extends PositionCategory.PLAYER ? K extends PositionType.MILITARY ? XMLMilitaryPlayerPosition : XMLPosition : XMLPosition;

/**@ignore */
export type PositionFetch<C extends PositionCategory, K extends PositionType> = XMLPositionFetch<C, K> extends XMLMilitaryPlayerPosition ? MilitaryPosition : Position;

/**@ignore */
export interface XMLPositionData<C extends PositionCategory, K extends PositionType> extends APIAttributes {

    category: C;
    type: K;
    player: Solo<XMLPositionFetch<C, K>>;

};

