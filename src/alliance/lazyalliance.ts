import { Universe, IDResolvable } from "../universe/universe";
import Alliance from "./alliance";

export default class LazyAlliance<T extends IDResolvable> {

    public readonly name: string;
    public readonly tag: string;
    public readonly id: string;

    public constructor(encodedData: XMLLazyAlliance, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.name = encodedData.name;
        this.tag = encodedData.tag;
        this.id = encodedData.id;
    
    }

    public async getAlliance(): Promise<Alliance<T> | undefined> {

        const allianceData = await this.universe.getAllianceData();
        
        return allianceData.getAllianceById(this.id);
    
    }

}

export interface XMLLazyAlliance {
    name: string;
    tag: string;
    id: string;
}
