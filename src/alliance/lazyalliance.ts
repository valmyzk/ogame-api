import Universe, { ID } from "../universe/universe";
import Alliance from "./alliance";

export default class LazyAlliance<T extends ID> {

    public readonly name: string;
    public readonly tag: string;
    public readonly id: string;

    public constructor(encodedData: XMLLazyAlliance, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.name = encodedData.name;
        this.tag = encodedData.tag;
        this.id = encodedData.id;
    
    }

}

export interface XMLLazyAlliance {
    name: string;
    tag: string;
    id: string;
}
