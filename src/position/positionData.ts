import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Position, { PositionType as PositionTypeEnum, XMLPosition } from "./position";
import { Solo } from "../../typings/util";
import { XMLMilitaryPlayerPosition, MilitaryPosition } from "../../src/player/player";

export default function parseXml<T extends ID, C extends PositionCategory, K extends PositionTypeEnum>(encodedData: XMLPositionData<C, K>, universe: Universe<T>) {
    
    const array = resolveSolo(encodedData.player) as unknown as PositionInterface<C, K>[];

    return array.map(position => 

        new Position<T>({

            score: position.score,
            position: position.position,
            type: encodedData.type,
            ships: position.ships,
            id: position.id

        }, universe, encodedData.timestamp)

    ) as PositionType<T, C, K>[];

};

type PositionInterface<C extends PositionCategory, K extends PositionTypeEnum> = C extends PositionCategory.PLAYER ? K extends PositionTypeEnum.MILITARY ? XMLMilitaryPlayerPosition : XMLPosition : XMLPosition;
export type PositionType<T extends ID, C extends PositionCategory, K extends PositionTypeEnum> = PositionInterface<C, K> extends XMLMilitaryPlayerPosition ? MilitaryPosition<T> : Position<T>;

export interface XMLPositionData<C extends PositionCategory, K extends PositionTypeEnum> extends APIAttributes {

    category: C;
    type: K;
    player: Solo<PositionInterface<C, K>>;

};

export const enum PositionCategory {

    PLAYER = "1",
    ALLIANCE = "2"

}