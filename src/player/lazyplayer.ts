import Player, { XMLPlayer } from "./player";
import { Universe, IDResolvable } from "../universe/universe";
import Alliance from "../alliance/alliance";

/**@description Player Reference */
export default class LazyPlayer<T extends IDResolvable> {

    public readonly id: string;
    public readonly universe: Universe<T>;
    public readonly timestamp: string;

    public constructor(universe: Universe<T>, data: XMLLazyPlayer, timestamp: string) {

        this.id = data.id;
        this.universe = universe;
        this.timestamp = timestamp;
    
    }

    public async getPlayer() {

        const playerData = await this.universe["fetchApi"]<XMLPlayer>("playerData", `id=${this.id}`);

        return new Player<T>(playerData, this.universe);
    
    }

}

/**@description Player reference with additional features such as status and alliance */
export class ExtendedLazyPlayer<T extends IDResolvable> extends LazyPlayer<T> {

    public readonly name: string;
    public readonly allianceId?: string;
    public readonly status?: string;

    public constructor(universe: Universe<T>, data: XMLExtendedLazyPlayer, timestamp: string) {

        super(universe, data, timestamp);
        this.name = data.name;

        if (data.alliance) {

            this.allianceId = data.alliance;
        
        }

        this.status = data.status;
    
    }

    public async getPlayer() {

        const player: Player<T> = await super.getPlayer();

        //In case of API desync, update player alliance
        if (player.timestamp < this.timestamp) {

            player["syncAllianceId"] = this.allianceId || null;
        
        }

        return player;
    
    }

    /**@description Uses alliances API */
    public async getAlliance() {

        if (this.allianceId) {

            const allianceData = await this.universe.getAllianceData();
            const alliance = allianceData.filter(alliance => alliance.id === this.id)[0] as Alliance<T>;
            
            return alliance;
        
        }
    
    }

}

export interface XMLExtendedLazyPlayer extends XMLLazyPlayer {
    name: string;
    alliance?: string;
    status?: string;
}

export interface XMLLazyPlayer {
    id: string;
}
