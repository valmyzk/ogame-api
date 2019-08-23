import LazyPlayer, { XMLLazyPlayer } from "../player/lazyplayer";
import Universe, { ID } from "../universe/universe";
import { Solo, Writable } from "../../typings/util";

export default class Alliance<T extends ID> {

    public readonly id: string;
    public readonly name: string;
    public readonly tag: string;
    public readonly founder: LazyPlayer<T>;
    public readonly foundDate: string;
    public readonly logo?: string;
    public readonly open?: boolean;
    public readonly homepage?: string;
    public readonly members: LazyPlayer<T>[] = [];

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
        this.universe = universe;
        this.timestamp = timestamp;

        this.parseMembers(encodedData.player);
    
    }

    private parseMembers(members: Solo<XMLLazyPlayer>) {

        if(Array.isArray(members)) {

            (this as Writable<this>).members = members.map(member => {

                return new LazyPlayer<T>(this.universe, member, this.timestamp);

            });

        }

        else {

            (this as Writable<this>).members = [new LazyPlayer<T>(this.universe, members, this.timestamp)];

        }

    }

}

export interface XMLAlliance {
    player: XMLLazyPlayer | XMLLazyPlayer[];
    id: string;
    name: string;
    tag: string;
    founder: string;
    foundDate: string;
    logo?: string;
    open?: string;
    homepage?: string;
}
