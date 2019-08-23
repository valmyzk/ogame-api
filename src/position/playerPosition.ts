import { ID, Universe, APIAttributes } from "../universe/universe";
import { ReferencedPosition } from "./position";

export type PlayerPosition<T extends ID> = ReferencedPosition<T, string>;

export default function parse<T extends ID>(encodedData: XMLPlayerPositions, universe: Universe<T>) {
    
    return encodedData.player.map(position => 

        new ReferencedPosition<T, string>({

            score: position.score,
            text: position.position,
            type: encodedData.type

        }, universe, encodedData.timestamp, position.id)

    );

};

export interface XMLPlayerPosition {

    position: string;
    id: string;
    score: string;

};

export interface XMLPlayerPositions extends APIAttributes {

    category: string;
    type: string;
    player: XMLPlayerPosition[];

};