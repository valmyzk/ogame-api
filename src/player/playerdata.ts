import { Universe } from "../universe/universe";
import { PlayerReference, XMLPlayerReference } from "./lazyplayer";
import { Solo } from "../../typings/util";
import { APIAttributes, resolveSolo } from "../xml";

/**Parses XML Player root file to a Player array
 * @category player
 */
export function parseXml(encodedData: XMLPlayerData, universe: Universe) {

    const playerArray = resolveSolo(encodedData.player);

    return playerArray.map(player => 

        new PlayerReference(universe, player, encodedData.timestamp) 

    );

}

/**@ignore */
export interface XMLPlayerData extends APIAttributes {

    player: Solo<XMLPlayerReference>;

}