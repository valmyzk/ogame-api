import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import { ExtendedLazyPlayer, XMLExtendedLazyPlayer } from "./lazyplayer";

export default class PlayerData<T extends IDResolvable> {

    public readonly players: ExtendedLazyPlayer<T>[] = [];
    public readonly timestamp: string;

    public constructor(encodedData: XMLPlayerData, public readonly universe: Universe<T>) {

        this.universe = universe;
        this.timestamp = encodedData.timestamp;

        this.players = encodedData.player.map(player => {

            return new ExtendedLazyPlayer<T>(universe, player, this.timestamp);

        });
    
    }

    public getPlayerById(id: string): ExtendedLazyPlayer<T> | undefined {

        return this.players.filter(a => a.id === id)[0];
    
    }

    public getPlayerByName(name: string): ExtendedLazyPlayer<T> | undefined {

        return this.players.find((v) => v.name === name);
    
    }

}

export interface XMLPlayerData extends APIAttributes {
    player: XMLExtendedLazyPlayer[];
}
