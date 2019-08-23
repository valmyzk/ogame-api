import { Universe, ID, APIAttributes, resolveSolo } from "../universe/universe";
import Alliance, { XMLAlliance } from "./alliance";
import { Solo } from "../typings/util";

export default class {

    private static parseXml<T extends ID>(encodedData: XMLAllianceData, universe: Universe<T>) {

        const allianceArray = resolveSolo(encodedData.alliance);
        return allianceArray.map(alliance => 
          
            new Alliance(alliance, universe, encodedData.timestamp)

        );

    }

}

export type AllianceData<T extends ID> = Alliance<T>[];

export interface XMLAllianceData extends APIAttributes {
    alliance: Solo<XMLAlliance>;
}
