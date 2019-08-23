import { Universe, ID, APIAttributes } from "../universe/universe";
import { Writable } from "../typings/util";
import Localization, { XMLLocalization } from "./localization";

export default class {

    private static parseXml<T extends ID>(encodedData: XMLLocalizationData, universe: Universe<T>) {

        const localizationMap = new Map<string, Localization<T>[]>();

        for(const group in encodedData) {

            const value = encodedData[group];

            if(typeof value === "object") {

                const instancedLocalizations = value.name.map(localization => {

                    return new Localization<T>(localization, universe, encodedData.timestamp);

                });

                localizationMap.set(group, instancedLocalizations);                

            }

        }

        return localizationMap as LocalizationMap<T>;

    }

}

export interface LocalizationGroups<T extends ID> {

    techs: Localization<T>[];
    missions: Localization<T>[];
    
}

export type LocalizationMap<T extends ID> = FlexibleMap<ReadonlyCustomMap<LocalizationGroups<T>>>

export interface XMLLocalizationData extends APIAttributes {
    [key: string]:
    | (
        | {
            name: XMLLocalization[];
				  }
        | string)
    | undefined;
    timestamp: string;
}