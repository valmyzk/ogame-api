import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import Localization, { XMLLocalization } from "./localization";
import { FlexibleMap, ReadonlyCustomMap } from "../../typings/map";
import { Solo } from "../../typings/util";

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

//Simplify type name
export interface LocalizationMap<T extends ID> extends FlexibleMap<ReadonlyCustomMap<LocalizationGroups<T>>> {};

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