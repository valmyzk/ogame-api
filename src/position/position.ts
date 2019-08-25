import Universe, { ID } from "../universe/universe";

export default class Position<T extends ID> {

    public readonly type: string;
    public readonly score: string;
    public readonly ranking: string;
    public readonly ships?: string;

    public constructor(encodedData: XMLPosition, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.type = encodedData.type;
        this.score = encodedData.score;
        this.ranking = encodedData.text;
        this.ships = encodedData.ships;
    
    }

};

export interface XMLPosition {
    text: string;
    ships?: string;
    type: string;
    score: string;
}