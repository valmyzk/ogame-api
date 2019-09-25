import { parse } from "fast-xml-parser";
import Planet from "../planet/planet";
import PlayerData, { XMLPlayerData } from "../player/playerdata";
import PlanetData, { XMLPlanetData } from "../planet/planetdata";
import AllianceData, { XMLAllianceData } from "../alliance/alliancedata";
import ServerData, { XMLServerData, ServerMap } from "./serverData";
import LocalizationData, { XMLLocalizationData, LocalizationMap } from "../localization/localizationData";
import PositionData, { XMLPositionData, PositionCategory, PositionType } from "../position/positionData";
import ifetch from "isomorphic-fetch";
import PlanetReport from "../report/planet";
import { ResolveSolo, Solo } from "../../typings/util";
import { PositionType as PositionTypeEnum } from "../position/position";
import Player, { XMLPlayer } from "../player/player";
import { ExtendedLazyPlayer } from "../player/lazyplayer";
import Alliance from "../alliance/alliance";

export type ID = number | string;
export const resolveSolo = <T>(solo: T): ResolveSolo<T> => {

    return (Array.isArray(solo) ? solo : [solo]) as ResolveSolo<T>;

};

/**@category universes */
export default class Universe<T extends ID> {

    public readonly endpoint: string;

    /**@param id Universe's ID
     * @param region Universe's region
     * Used by official GameForge servers
     */
    public constructor(id: ID, region: Region);
    public constructor(encodedData: XMLUniverse);

    /**@param endpoint Universe's API endpoint
     * Used by unofficial servers
     */
    public constructor(endpoint: string);

    /**@todo Disable XMLUniverse href parsing */
    public constructor(encodedData: ID | XMLUniverse | string, arg1?: Region) {

        this.endpoint = Universe["parseEndpoint"](encodedData, arg1);

    }

    /**Gets universe's players */
    public async getPlayerData(): Promise<ExtendedLazyPlayer<T>[]> {

        const playerData = await this.fetchApi<XMLPlayerData>("players");
        
        return PlayerData(playerData, this);
    
    }

    /**Gets universe's planets */
    public async getPlanetData(): Promise<Planet<T>[]> {

        const planetData = await this.fetchApi<XMLPlanetData>("universe");
        
        return PlanetData<T>(planetData, this);
    
    }

    /**Gets universe's alliances */
    public async getAllianceData(): Promise<Alliance<T>[]> {

        const allianceData = await this.fetchApi<XMLAllianceData>("alliances");
        
        return AllianceData<T>(allianceData, this);
    
    };

    /**Gets universe's player positions (highscore) */
    public async getPlayerPositions<Type extends PositionTypeEnum>(type: Type) {

        const positionsData = await this.fetchApi<XMLPositionData<PositionCategory.PLAYER, Type>>("highscore", `category=1&type=${type}`);
        const positions = PositionData(positionsData, this) as PositionType<T, PositionCategory.PLAYER, Type>[];

        return positions;

    };

    /**Gets universe's alliance positions (highscore) */
    public async getAlliancePositions<Type extends PositionTypeEnum>(type: Type) {

        const positionsData = await this.fetchApi<XMLPositionData<PositionCategory.ALLIANCE, Type>>("highscore", `category=2&type=${type}`);
        const positions = PositionData(positionsData, this) as PositionType<T, PositionCategory.ALLIANCE, Type>[];

        return positions;
        
    }

    /**Gets universe's "nearby" universes
     * @todo Migrate to global export, unlink from Universe id
     * @todo fix naming
     */
    public async getNearbyUniverses(): Promise<Universe<number>[]> {

        const universesData = await this.fetchApi<XMLUniverses>("universes");
        const array = resolveSolo(universesData.universe);

        return array.map(universe => new Universe<number>(universe));
    
    }

    /**Gets universe's properties */
    public async getServerData(): Promise<ServerMap> {

        const serverData = await this.fetchApi<XMLServerData>("serverData");

        return ServerData(serverData);
    
    }

    /**Gets universe's localizations */
    public async getLocalizations(): Promise<LocalizationMap<T>> {

        const localizationData = await this.fetchApi<XMLLocalizationData>("localization");

        return LocalizationData(localizationData, this);
    
    }

    /**Parses a planet report
     * @deprecated
     */
    public createPlanetReport(encodedData: string) {

        return new PlanetReport<T>(encodedData, this);

    }
    
    /**Gets full player (no references) by id */
    public async getPlayer(id: string) {

        const playerData = await this.fetchApi<XMLPlayer>("playerData", `id=${id}`);

        return new Player<T>(playerData, this);

    }

    /**Downloads an xml and casts it to an XML type */
    protected async fetchApi<T>(file: string, query = "") {

        const downloadPromise = await downloadXml(`${this.endpoint}/${file}.xml${query && "?"}${query}`) as {[key: string]: unknown};
        
        return downloadPromise[file] as T;
    
    }

    /**Parses the universe id and region to create an API endpoint
     */
    private static parseEndpoint(arg1: ID | XMLUniverse | string, arg2?: Region) {

        const factory = (id: string, region: string) => `https://${id}-${region}.ogame.gameforge.com/api`;

        const endpoint = !arg2 ? (arg1 as XMLUniverse)["href"] || arg1 as string
        : factory(typeof arg1 === "number" ? "s" + arg1 : (arg1 as string).toLowerCase(), arg2);

        return endpoint;
    
    }
    

}

/**@internal */
export const parseXml = <T>(xmlContent: string) => {

    return parse(xmlContent, {
        textNodeName: "text",
        attributeNamePrefix: "",
        ignoreAttributes: false
    }) as T;

};

/**@internal */
export async function downloadXml<T>(request: RequestInfo) {

    //console.log("Fetching " + request + "...");
    const apiResponse = await ifetch(request)
        .then((res): Promise<string> => res.text())
        .then(parseXml);

    return apiResponse as T;

};

export interface XMLUniverses {
    universe: Solo<XMLUniverse>;
}

export interface XMLUniverse {
    id: string;
    href: string;
}

/**Universe's region
 * @todo Investigate adding more regions
 * @utility
 */
export type Region = "ar" | "br" | "dk" | "de" | "es" | "fr" | "hr" | "it" | "hu" | "mx" | "nl" | "no" | "pl" | "pt" | "ro" | "si" | "sk" | "fi" | "se" | "tr" | "us" | "en" | "cz" | "gr" | "ru" | "tw" | "jp";

/**@ignore */
export interface APIAttributes {
    "xmlns:xsi": string;
    "xsi:noNamespaceSchemaLocation": string;
    timestamp: string;
    serverId: string;
}