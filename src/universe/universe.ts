import { parse } from "fast-xml-parser";
import Planet from "../planet/planet";
import Alliance from "../alliance/alliance";
import { ExtendedLazyPlayer } from "../player/lazyplayer";
import PlayerData, { XMLPlayerData, PlayerData as PlayerArray } from "../player/playerdata";
import PlanetData, { XMLPlanetData } from "../planet/planetdata";
import AllianceData, { XMLAllianceData, AllianceData as AllianceArray } from "../alliance/alliancedata";
import ServerData, { XMLServerData, ServerMap } from "./serverData";
import LocalizationData, { XMLLocalizationData, LocalizationMap } from "../localization/localizationData";
import parsePlayerPositions, { PlayerPosition, XMLPlayerPositions } from "../position/playerPosition";
import ifetch from "isomorphic-fetch";
import { PlanetReport } from "../report/planet";
import { ResolveSolo } from "../typings/util";

export type IDResolvable = number | string;

export class Universe<T extends IDResolvable> {

    public readonly id: T;
    public readonly region: RegionResolvable;
    public readonly planets: Planet<T>[] = [];
    public readonly alliances: Alliance<IDResolvable>[] = [];
    public readonly players: ExtendedLazyPlayer<T>[] = [];
    public get endpoint() {

        return Universe.parseEndpoint(this.id, this.region); 

    }

    public constructor(encodedData: XMLUniverse) {

        this.id = encodedData.id as T;
        this.region = encodedData.href.substr(13, 2) as RegionResolvable;

    }

    public async getPlayerData(): Promise<PlayerArray<T>> {

        const playerData = await this.fetchApi<XMLPlayerData>("players");
        
        return PlayerData["parseXml"](playerData, this);
    
    }

    public async getPlanetData(): Promise<PlanetData<T>> {

        const planetData = await this.fetchApi<XMLPlanetData>("universe");
        
        return new PlanetData(planetData, this);
    
    }

    public async getAllianceData(): Promise<AllianceArray<T>> {

        const allianceData = await this.fetchApi<XMLAllianceData>("alliances");
        
        return AllianceData["parseXml"](allianceData, this);
    
    };

    public async getPlayerPositions(type: number): Promise<PlayerPosition<T>[]> {

        const positionsData = await this.fetchApi<XMLPlayerPositions>("highscore", `category=1&type=${type}`);
        const highscores = parsePlayerPositions(positionsData, this);

        return highscores;

    };

    public async getNearbyUniverses(): Promise<Universe<number>[]> {

        const universesData = await this.fetchApi<XMLUniverses>("universes");

        return universesData.universe.map((universe): Universe<number> => new Universe<number>(universe));
    
    }

    public async getServerData(): Promise<ServerMap> {

        const serverData = await this.fetchApi<XMLServerData>("serverData");

        return ServerData["parseXml"](serverData);
    
    }

    public async getLocalizations(): Promise<LocalizationMap<T>> {

        const localizationData = await this.fetchApi<XMLLocalizationData>("localization");

        return LocalizationData["parseXml"](localizationData, this);
    
    }

    public createPlanetReport(encodedData: string) {

        return new PlanetReport<T>(encodedData, this);

    } 

    protected async fetchApi<T>(file: string, query: string = "") {

        const downloadPromise = await downloadXml(`${this.endpoint}/${file}.xml${query && "?"}${query}`) as {[key: string]: unknown};
        
        return downloadPromise[file] as T;
    
    }

    private static parseEndpoint(id: number | string, region: RegionResolvable) {

        const _id = typeof id === "number" ? `s${id}` : id.toLowerCase();

        return `https://${_id}-${region}.ogame.gameforge.com/api`;
    
    }

}

export const parseXml = <T>(xmlContent: string) => {

    return parse(xmlContent, {
        textNodeName: "text",
        attributeNamePrefix: "",
        ignoreAttributes: false
    }) as T;

};

export async function downloadXml<T>(request: RequestInfo) {

    //console.log("Fetching " + request + "...");
    const apiResponse = await ifetch(request)
        .then((res): Promise<string> => res.text())
        .then(parseXml);

    return apiResponse as T;

};


export const resolveSolo = <T>(solo: T): ResolveSolo<T> => {

    return Array.isArray(solo) ? solo : [solo] as ResolveSolo<T>;

};



interface XMLUniverses {
    universe: XMLUniverse[];
}

interface XMLUniverse {
    id: string;
    href: string;
}

export type RegionResolvable = "es" | "en" | "de" | "fr";

export interface APIAttributes {
    "xmlns:xsi": string;
    "xsi:noNamespaceSchemaLocation": string;
    timestamp: string;
    serverId: string;
}