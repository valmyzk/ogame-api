import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Alliance, { XMLAlliance } from "./alliance";
import { Solo } from "../../typings/util";

export default function parseXml<T extends ID>(encodedData: XMLAllianceData, universe: Universe<T>) {

    const allianceArray = resolveSolo(encodedData.alliance);
    
    return allianceArray.map(alliance => 
      
        new Alliance(alliance, universe, encodedData.timestamp)

    ) as Alliance<T>[];

}

export type AllianceData<T extends ID> = Alliance<T>[];

export interface XMLAllianceData extends APIAttributes {
    alliance: Solo<XMLAlliance>;
}
