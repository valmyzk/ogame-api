import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import { ExtendedLazyPlayer, XMLExtendedLazyPlayer } from "./lazyplayer";

export default class {

    private static parseXml<T extends IDResolvable>(encodedData: XMLPlayerData, universe: Universe<T>): ExtendedLazyPlayer<T>[] {

        return encodedData.player.map(player => 

            new ExtendedLazyPlayer<T>(universe, player, encodedData.timestamp) 

        );

    }

}

export interface XMLPlayerData extends APIAttributes {
    player: XMLExtendedLazyPlayer[];
}

export type PlayerData<T extends IDResolvable> = ExtendedLazyPlayer<T>[];
