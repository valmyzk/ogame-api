import Universe, { APIAttributes, resolveSolo } from "../universe/universe";
import { ExtendedLazyPlayer, XMLExtendedLazyPlayer } from "./lazyplayer";
import { Solo } from "../../typings/util";

/**Parses XML Player root file to a Player array
 * @category player
 */
export default function parseXml(encodedData: XMLPlayerData, universe: Universe) {

    const playerArray = resolveSolo(encodedData.player);

    return playerArray.map(player => 

        new ExtendedLazyPlayer(universe, player, encodedData.timestamp) 

    );

}

/**@ignore */
export interface XMLPlayerData extends APIAttributes {

    player: Solo<XMLExtendedLazyPlayer>;

}