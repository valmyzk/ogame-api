import { Region } from "./universe";
import { FlexibleMap, CustomMap, ReadonlyCustomMap } from "../../typings/map";

export default function parseXml(encodedData: XMLServerData) {

    const serverMap = new Map<string, ServerData[keyof ServerData]>() as FlexibleMap<CustomMap<ServerData>>;

    encodedData.acs = !!encodedData.acs;
    encodedData.rapidFire = !!encodedData.rapidFire;
    encodedData.donutGalaxy = !!encodedData.donutGalaxy;
    encodedData.donutSystem = !!encodedData.donutSystem;
    encodedData.wfEnabled = !!encodedData.wfEnabled;

    for(const entry in encodedData) {

        const value = encodedData[entry];

        serverMap.set(entry as keyof ServerData, value);

    }

    return serverMap;

}

interface ServerData {

    timestamp: number;
    serverId: string;
    name: string;
    number: number;
    language: Region;
    timezone: string;
    timezoneOffset: string;
    domain: string;
    version: string;
    speed: number;
    speedFleet: number;
    galaxies: number;
    systems: number;
    acs: boolean;
    rapidFire: boolean;
    defToTF: number;
    debrisFactor: number;
    debrisFactorDef: number;
    repairFactor: number;
    newbieProtectionLimit: number;
    newbieProtectionHigh: number;
    topScore: number;
    bonusFields: number;
    donutGalaxy: boolean;
    donutSystem: boolean;
    wfEnabled: boolean;
    wfMinimumRessLost: number;
    wfMinimumLossPercentage: number;
    wfBasicPercentageRepairable: number;
    globalDeuteriumSaveFactor: number;
    bashLimit: number;
    probeCargo: number;
    researchDurationDivisor: number;
    darkMatterNewAccount: number;

}

export interface XMLServerData {
    [key: string]: string | boolean | number;
}

export type ServerMap = FlexibleMap<ReadonlyCustomMap<ServerData>>;