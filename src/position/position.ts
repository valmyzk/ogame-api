import { Universe, IDResolvable } from "../universe/universe";

abstract class Position<T extends IDResolvable> {

    public readonly type: string;
    public readonly score: string;
    public readonly ranking: string;
    public readonly ships?: string;

    public constructor(encodedData: XMLPosition, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.type = encodedData.type;
        this.score = encodedData.score;
        this.ranking = encodedData.text;

        if (encodedData.ships) {

            this.ships = encodedData.ships;
        
        }
    
    }

};

export class ReferencedPosition<U extends IDResolvable, R> extends Position<U> {

    public constructor(encodedData: XMLPosition, public readonly universe: Universe<U>, public readonly timestamp: string, public readonly reference: R) {

        super(encodedData, universe, timestamp);
        this.reference = reference;

    };

};

export interface XMLPosition {
    text: string;
    ships?: string;
    type: string;
    score: string;
}