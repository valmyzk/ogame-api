import { Solo } from "../../typings/util";
import { XMLUniverse, Region, ID, Universe } from "./universe";
import { fetch, resolveSolo } from "../xml";

/**
 * @param base Due to how OGame's API is structured, a universe id is required to get the universe list
 * @param region Universe's region
 * @returns List of universes of a specified region
 */
export async function getUniverses(base: ID, region: Region) {

    const endpoint = Universe["parseEndpoint"](base, region);
    const universeData = await fetch<XMLUniverses>(endpoint, "universes");
    const list = resolveSolo(universeData.universe);

    return list.map(universe => new Universe(universe));

}

export interface XMLUniverses {

    universe: Solo<XMLUniverse>;

}