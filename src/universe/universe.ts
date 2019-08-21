import { parse } from "fast-xml-parser";
import Planet from "../planet/planet";
import Alliance from "../alliance/alliance";
import { ExtendedLazyPlayer } from "../player/lazyplayer";
import PlayerData, { XMLPlayerData } from "../player/playerdata";
import PlanetData, { XMLPlanetData } from "../planet/planetdata";
import AllianceData, { XMLAllianceData } from "../alliance/alliancedata";
import ServerData, { XMLServerData } from "./serverData";
import LocalizationData, { XMLLocalizationData } from "../localization/localizationData";
import parsePlayerPositions, { PlayerPosition, XMLPlayerPositions } from "../position/playerPosition";
import ifetch from "isomorphic-fetch";
import { PlanetReport } from "../report/planet";

export type IDResolvable = number | string;

export class Universe<T extends IDResolvable> {

    public readonly id: T;
    public readonly region: RegionResolvable;
    public readonly planets: Planet<T>[] = [];
    public readonly alliances: Alliance<IDResolvable>[] = [];
    public readonly players: ExtendedLazyPlayer<T>[] = [];
    public get endpoint(): string {

        return Universe.parseEndpoint(this.id, this.region); 

    }

    public constructor(encodedData: XMLUniverse) {

        this.id = encodedData.id as T;
        this.region = encodedData.href.substr(13, 2) as RegionResolvable;

    }

    public async getPlayerData(): Promise<PlayerData<T>> {

        const playerData = await this.fetchApi<XMLPlayerData>("players");
        
        return new PlayerData(playerData, this);
    
    }

    public async getPlanetData(): Promise<PlanetData<T>> {

        const planetData = await this.fetchApi<XMLPlanetData>("universe");
        
        return new PlanetData(planetData, this);
    
    }

    public async getAllianceData(): Promise<AllianceData<T>> {

        const allianceData = await this.fetchApi<XMLAllianceData>("alliances");
        
        return new AllianceData(allianceData, this);
    
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

    public async getServerData(): Promise<ServerData<T>> {

        const serverData = await this.fetchApi<XMLServerData>("serverData");

        return new ServerData(serverData, this);
    
    }

    public async getLocalizations(): Promise<LocalizationData<T>> {

        const localizationData = await this.fetchApi<XMLLocalizationData>("localization");

        return new LocalizationData(localizationData, this);
    
    }

    public createPlanetReport(encodedData: string): PlanetReport<T> {

        return new PlanetReport<T>(encodedData, this);

    } 

    protected async fetchApi<T>(file: string, query: string = ""): Promise<T> {

        const downloadPromise = await downloadXml(`${this.endpoint}/${file}.xml${query && "?"}${query}`) as {[key: string]: unknown};
        
        return downloadPromise[file] as T;
    
    }

    private static parseEndpoint(id: number | string, region: RegionResolvable): string {

        const _id = typeof id === "number" ? `s${id}` : id.toLowerCase();

        return `https://${_id}-${region}.ogame.gameforge.com/api`;
    
    }

}

export const parseXml = <T>(xmlContent: string): T => {

    return parse(xmlContent, {
        textNodeName: "text",
        attributeNamePrefix: "",
        ignoreAttributes: false
    });

};

export async function downloadXml<T>(request: RequestInfo): Promise<T> {

    //console.log("Fetching " + request + "...");
    const apiResponse = await ifetch(request)
        .then((res): Promise<string> => res.text())
        .then(parseXml);

    return apiResponse as T;

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