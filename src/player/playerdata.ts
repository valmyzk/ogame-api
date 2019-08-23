import { Universe, ID, APIAttributes } from "../universe/universe";
import { ExtendedLazyPlayer, XMLExtendedLazyPlayer } from "./lazyplayer";
import { Solo } from "../typings/util";

export default class {

    private static parseXml<T extends ID>(encodedData: XMLPlayerData, universe: Universe<T>) {

        const playerArray = Array.isArray(encodedData.player) ? encodedData.player : [encodedData.player];
        return playerArray.map(player => 

            new ExtendedLazyPlayer<T>(universe, player, encodedData.timestamp) 

        );

    }

}

export interface XMLPlayerData extends APIAttributes {
    player: Solo<XMLExtendedLazyPlayer>;
}

export type PlayerData<T extends ID> = ExtendedLazyPlayer<T>[];
