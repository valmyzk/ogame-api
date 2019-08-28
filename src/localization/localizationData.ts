import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Localization, { XMLLocalization } from "./localization";
import { FlexibleMap, ReadonlyCustomMap } from "../../typings/map";
import { Solo } from "../../typings/util";

/**Parses XML Localization root file to ES6 LocalizationMap
 * @category localization
 */
export default function parseXml<T extends ID>(encodedData: XMLLocalizationData, universe: Universe<T>) {

    const localizationMap = new Map<string, Localization<T>[]>();

    for(const group in encodedData) {

        const value = encodedData[group];

        if(typeof value === "object") {

            const array = resolveSolo(value.name);
            const instancedLocalizations = array.map(localization => {

                return new Localization<T>(localization, universe, encodedData.timestamp);

            });

            localizationMap.set(group, instancedLocalizations);                

        }

    }

    return localizationMap as LocalizationMap<T>;

}

export interface LocalizationGroups<T extends ID> {

    techs: Localization<T>[];
    missions: Localization<T>[];
    
}

/**ES6 Map mapped by localization group to localization array. Identical to Map<string, Localization<T>[]>
 * @category localization
 */
export interface LocalizationMap<T extends ID> extends FlexibleMap<ReadonlyCustomMap<LocalizationGroups<T>>> {};

/**@internal */
export interface XMLLocalizationData extends APIAttributes {
    [key: string]:
    | (
        | {
            name: Solo<XMLLocalization>;
				  }
        | string)
    | undefined;
    timestamp: string;
}