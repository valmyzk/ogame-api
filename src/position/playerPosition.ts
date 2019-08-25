import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import ReferencedPosition from "./position";
import { Solo } from "../../typings/util";

export type PlayerPosition<T extends ID> = ReferencedPosition<T, string>;

export default function parseXml<T extends ID>(encodedData: XMLPlayerPositions, universe: Universe<T>) {
    
    const array = resolveSolo(encodedData.player);
    
    return array.map(position => 

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
    player: Solo<XMLPlayerPosition>;

};