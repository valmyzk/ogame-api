import LazyPlayer, { XMLLazyPlayer } from "../player/lazyplayer";
import Universe, { ID, resolveSolo } from "../universe/universe";
import { Solo } from "../../typings/util";

export default class Alliance<T extends ID> {

    public readonly id: string;

    public readonly name: string;

    public readonly tag: string;

    public readonly founder: LazyPlayer<T>;

    public readonly foundDate: string;

    public readonly logo?: string;
    
    public readonly open?: boolean;

    public readonly homepage?: string;

    public readonly members: LazyPlayer<T>[];

    public constructor(encodedData: XMLAlliance, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.id = encodedData.id;
        this.name = encodedData.name;
        this.tag = encodedData.tag;
        this.founder = new LazyPlayer(
            universe,
            {
                id: encodedData.founder
            },
            timestamp
        );

        this.foundDate = encodedData.foundDate;
        this.logo = encodedData.logo;
        this.open = !!encodedData.open;
        this.homepage = encodedData.homepage;

        this.members = this.parseMembers(encodedData.player);
    
    }

    private parseMembers(members: Solo<XMLLazyPlayer>) {

        const array = resolveSolo(members);

        return array.map(member => {

            return new LazyPlayer<T>(this.universe, member, this.timestamp);

        });

    }

}

export interface XMLAlliance {
    player: Solo<XMLLazyPlayer>;
    id: string;
    name: string;
    tag: string;
    founder: string;
    foundDate: string;
    logo?: string;
    open?: string;
    homepage?: string;
}
