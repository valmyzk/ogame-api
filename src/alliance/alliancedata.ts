import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import Alliance, { XMLAlliance } from "./alliance";
import { Writable, Solo } from "../typings/util";

export default class AllianceData<T extends IDResolvable> {

    public readonly alliances: Alliance<T>[] = [];
    public readonly timestamp: string;

    public constructor(encodedData: XMLAllianceData, public readonly universe: Universe<T>) {

        this.timestamp = encodedData.timestamp;
        this.parseAlliances(encodedData.alliance);
    
    }

    private parseAlliances(alliances: Solo<XMLAlliance>): void {

        const allianceArray = Array.isArray(alliances) ? alliances : [alliances];
        (this as Writable<this>).alliances = allianceArray.map(alliance => {

            return new Alliance(alliance, this.universe, this.timestamp);

        });

    }

    public getAllianceById(id: string): Alliance<T> | undefined {

        return this.alliances.filter(a => a.id === id)[0];
    
    }

    public getAlliancesByName(name: string): Alliance<T>[] {

        return this.alliances.filter(a => a.name === name);
    
    }

}

export interface XMLAllianceData extends APIAttributes {
    alliance: Solo<XMLAlliance>;
}
