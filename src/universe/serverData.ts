import { Region } from "./universe";
import { FlexibleMap, CustomMap, ReadonlyCustomMap } from "../../typings/map";
import { xml } from "../xml";
import { Union } from "ts-toolbelt";

/**Parses XML Localization root file to ES6 LocalizationMap
 * @category serverData
 */
export function parseXml(encodedData: XMLServerData, xsd: XsdList) {

    const serverMap = new Map<string, ServerData[keyof ServerData]>() as FlexibleMap<CustomMap<ServerData>>;
    const boolean = xsd.filter(v => v.type === "xs:boolean");

    for(const { name } of boolean) {

        encodedData[name] = !!encodedData[name]; 

    }

    for(const entry in encodedData) {

        const value = encodedData[entry];

        serverMap.set(entry as keyof ServerData, value);

    }

    return serverMap as ServerMap;

}

export async function getXsd(endpoint: string) {

    const xsd = await xml<any>(endpoint + "/xsd/serverData.xsd");
    const list = xsd["xs:schema"]["xs:element"]["xs:complexType"]["xs:sequence"]["xs:element"] as XsdList;
    
    return list;

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

/**@ignore */
export interface XMLServerData {

    [key: string]: string | boolean | number;

}

type XsdMap<N extends keyof ServerData, V = ServerData[N]> = V extends number ? "xs:integer" | "xs:float" | "xs:int" :
                                                                   V extends string ? "xs:string" :
                                                                   V extends boolean ? "xs:boolean" : any

type XsdDescription<N extends keyof ServerData> = {name: N, type: XsdMap<N>}
type XsdList = Union.TupleOf<{ [K in keyof ServerData]: XsdDescription<K> }[keyof ServerData]>

/**ES6 Map mapped by server property to server value */
export interface ServerMap extends FlexibleMap<ReadonlyCustomMap<ServerData>> {};