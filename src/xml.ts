import ifetch from "isomorphic-fetch";
import { parse } from "fast-xml-parser";
import { ResolveSolo } from "../typings/util";

const parsedCache = new Map<string, APIAttributes>();

const UpdateInterval = {

    players: 86400,
    universe: 604800,
    highscore: 3600,
    alliances: 86400,
    serverData: 86400,
    playerData: 604800

} as {[key: string]: number}

/**@internal */
export const parseXml = <T>(xmlContent: string) => {

    return parse(xmlContent, {
        textNodeName: "text",
        attributeNamePrefix: "",
        ignoreAttributes: false
    }) as T;

};

/**@internal */
export async function xml<T>(request: RequestInfo) {

    //console.log("Fetching " + request + "...");
    const apiResponse = await ifetch(request)
        .then((res): Promise<string> => res.text())
        .then(parseXml);

    return apiResponse as T;

};

/**Downloads an xml and casts it to an XML type */
export async function fetch<T>(endpoint: string, file: string, query = "") {

    const url = `${endpoint}/${file}.xml${query && "?"}${query}`;

    const cached = parsedCache.get(url) as {[key: string]: unknown} | undefined;
    const age = Date.now() - (cached ? Number.parseInt(cached.timestamp as string) : 0);

    if(!cached || age >= UpdateInterval[file]) {

        const download = await xml<{[key: string]: unknown} & APIAttributes>(url);
        parsedCache.set(url, download);

        return download[file] as T;

    }
    
    else return cached[file] as T;
    
}

/**@ignore */
export interface APIAttributes {

    "xmlns:xsi": string;
    "xsi:noNamespaceSchemaLocation": string;
    timestamp: string;
    serverId: string;

}

export const resolveSolo = <T>(solo: T): ResolveSolo<T> => {

    return (Array.isArray(solo) ? solo : [solo]) as ResolveSolo<T>;

};