import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import { ExtendedLazyPlayer, XMLExtendedLazyPlayer } from "./lazyplayer";
import { Solo } from "../../typings/util";

/**Parses XML Player root file to a Player array
 * @category player
 */
export default function parseXml<T extends ID>(encodedData: XMLPlayerData, universe: Universe<T>) {

    const playerArray = resolveSolo(encodedData.player);

    return playerArray.map(player => 

        new ExtendedLazyPlayer<T>(universe, player, encodedData.timestamp) 

    );

}

/**@internal */
export interface XMLPlayerData extends APIAttributes {

    player: Solo<XMLExtendedLazyPlayer>;

}