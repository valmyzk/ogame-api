import Universe, { ID, APIAttributes, resolveSolo } from "../universe/universe";
import { ExtendedLazyPlayer, XMLExtendedLazyPlayer } from "./lazyplayer";
import { Solo } from "../typings/util";

export default function PlayerData<T extends ID>(encodedData: XMLPlayerData, universe: Universe<T>) {

    const playerArray = resolveSolo(encodedData.player);
    return playerArray.map(player => 

        new ExtendedLazyPlayer<T>(universe, player, encodedData.timestamp) 

    );

}

export interface XMLPlayerData extends APIAttributes {
    player: Solo<XMLExtendedLazyPlayer>;
}

export type PlayerData<T extends ID> = ExtendedLazyPlayer<T>[];
