import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Position from "./position";
import { Solo } from "../../typings/util";

export default function parseXml<T extends ID>(encodedData: XMLPlayerPositions, universe: Universe<T>) {
    
    const array = resolveSolo(encodedData.player);

    return array.map(position => 

        new Position<T>({

            score: position.score,
            text: position.position,
            type: encodedData.type

        }, universe, encodedData.timestamp)

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