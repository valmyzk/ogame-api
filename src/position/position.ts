import Universe, { ID } from "../universe/universe";

export default class Position<T extends ID> {

    public readonly type: string;
    public readonly score: string;
    public readonly ranking: string;
    public readonly ships?: string;

    public constructor(encodedData: XMLPosition, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.type = encodedData.type;
        this.score = encodedData.score;
        this.ranking = encodedData.position;

        if(encodedData.ships) {

            this.ships = encodedData.ships;

        }
    
    }

};

export interface XMLPosition {
    position: string;
    ships?: string;
    type: string;
    score: string;
}

export const enum PositionType {

    TOTAL = "0",
    ECONOMY = "1",
    RESEARCH = "2",
    MILITARY = "3",
    MILITARY_BUILT = "5",
    MILITARY_DESTROYED = "6",
    MILITARY_LOST = "4",
    HONOR = "7"

}