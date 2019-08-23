import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import { Writable } from "../typings/util";
import Localization, { XMLLocalization } from "./localization";

export default class {

    private static parseXml<T extends IDResolvable>(encodedData: XMLLocalizationData, universe: Universe<T>) {

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

interface LocalizationGroups<T extends IDResolvable> {

    techs: Localization<T>[];
    missions: Localization<T>[];
    
}

export type LocalizationMap<T extends IDResolvable> = FlexibleMap<ReadonlyCustomMap<LocalizationGroups<T>>>

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