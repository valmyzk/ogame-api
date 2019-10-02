import Universe, { APIAttributes, resolveSolo } from "../universe/universe";
import Position, { PositionType as PositionTypeEnum, XMLPosition } from "./position";
import { Solo } from "../../typings/util";
import { XMLMilitaryPlayerPosition, MilitaryPosition } from "../player/player";

/**Parses XML Position root file to a Position array
 * @category positions
 */
export default function parseXml<C extends PositionCategory, K extends PositionTypeEnum>(encodedData: XMLPositionData<C, K>, universe: Universe) {
    
    const array = resolveSolo(encodedData.player) as unknown as PositionInterface<C, K>[];

    return array.map(position => 

        new Position({

            score: position.score,
            position: position.position,
            type: encodedData.type,
            ships: position.ships,
            id: position.id

        }, universe, encodedData.timestamp)

    ) as PositionType<C, K>[];

};

type PositionInterface<C extends PositionCategory, K extends PositionTypeEnum> = C extends PositionCategory.PLAYER ? K extends PositionTypeEnum.MILITARY ? XMLMilitaryPlayerPosition : XMLPosition : XMLPosition;

/**@ignore */
export type PositionType<C extends PositionCategory, K extends PositionTypeEnum> = PositionInterface<C, K> extends XMLMilitaryPlayerPosition ? MilitaryPosition : Position;

/**@ignore */
export interface XMLPositionData<C extends PositionCategory, K extends PositionTypeEnum> extends APIAttributes {

    category: C;
    type: K;
    player: Solo<PositionInterface<C, K>>;

};

/**
 * @category positions
 * @utility
 */
export const enum PositionCategory {

    PLAYER = "1",
    ALLIANCE = "2"

}