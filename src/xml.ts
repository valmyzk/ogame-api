import ifetch from "isomorphic-fetch";
import { parse } from "fast-xml-parser";
import { ResolveSolo } from "../typings/util";

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

    const download = await xml<{[key: string]: unknown}>(`${endpoint}/${file}.xml${query && "?"}${query}`);
        
    return download[file] as T;
    
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