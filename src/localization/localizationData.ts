import Universe from "../universe/universe";
import Localization, { XMLLocalization } from "./localization";
import { FlexibleMap, ReadonlyCustomMap } from "../../typings/map";
import { Solo } from "../../typings/util";
import { resolveSolo, APIAttributes } from "../xml";

/**Parses XML Localization root file to ES6 LocalizationMap
 * @category localization
 */
export default function parseXml(encodedData: XMLLocalizationData, universe: Universe) {

    const parsed = Object.entries(encodedData)
        .filter(([, value]) => typeof value === "object")
        .map(([key, value]) => [key, resolveSolo((value as XMLLocalizationGroup).name)] as const)
        .map(([key, value]) => [key, value.map(l => new Localization(l, universe, encodedData.timestamp))]);


    return new Map<string, Localization[]>(parsed as ([string, Localization[]])[]) as LocalizationMap;

}

export interface LocalizationGroups {

    techs: Localization[];
    missions: Localization[];
    
}

/**ES6 Map mapped by localization group to localization array. Identical to Map<string, Localization<T>[]>
 * @category localization
 */
export interface LocalizationMap extends FlexibleMap<ReadonlyCustomMap<LocalizationGroups>> {};

/**@ignore */
export interface XMLLocalizationData extends APIAttributes {

    [key: string]: XMLLocalizationGroup | string;
    
}

/**@ignore */
export interface XMLLocalizationGroup {

    name: Solo<XMLLocalization>;

}