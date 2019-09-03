import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Localization, { XMLLocalization } from "./localization";
import { FlexibleMap, ReadonlyCustomMap } from "../../typings/map";
import { Solo } from "../../typings/util";

/**Parses XML Localization root file to ES6 LocalizationMap
 * @category localization
 */
export default function parseXml<T extends ID>(encodedData: XMLLocalizationData, universe: Universe<T>) {

    const parsed = Object.entries(encodedData)
        .filter(([, value]) => typeof value === "object")
        .map(([key, value]) => [key, resolveSolo((value as XMLLocalizationGroup).name)] as const)
        .map(([key, value]) => [key, value.map(l => new Localization<T>(l, universe, encodedData.timestamp))]);


    return new Map<string, Localization<T>[]>(parsed as ([string, Localization<T>[]])[]) as LocalizationMap<T>;

}

export interface LocalizationGroups<T extends ID> {

    techs: Localization<T>[];
    missions: Localization<T>[];
    
}

/**ES6 Map mapped by localization group to localization array. Identical to Map<string, Localization<T>[]>
 * @category localization
 */
export interface LocalizationMap<T extends ID> extends FlexibleMap<ReadonlyCustomMap<LocalizationGroups<T>>> {};

/**@ignore */
export interface XMLLocalizationData extends APIAttributes {
    [key: string]: XMLLocalizationGroup | string;
}

/**@ignore */
export interface XMLLocalizationGroup {

    name: Solo<XMLLocalization>;

}