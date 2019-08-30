import LazyPlayer, { XMLLazyPlayer } from "../player/lazyplayer";
import Universe, { ID, resolveSolo } from "../universe/universe";
import { Solo } from "../../typings/util";

/**OGame alliance
 * @category alliance
 */
export default class Alliance<T extends ID> {

    /**Identifier of the alliance */
    public readonly id: string;

    /**Alliance name */
    public readonly name: string;

    public readonly tag: string;

    /**Alliance founder */
    public readonly founder: LazyPlayer<T>;

    /**Alliance's found date represented in a UNIX timestamp */
    public readonly foundDate: string;

    /**Alliance's logo URL */
    public readonly logo?: string;
    public readonly open: boolean;

    /**Alliance's homepage */
    public readonly homepage?: string;

    /**Array of members of alliance, including founder */
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

        const array = members && resolveSolo(members);

        return array ? array.map(member => {

            return new LazyPlayer<T>(this.universe, member, this.timestamp);

        }) : [];

    }

}

/**@ignore */
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
