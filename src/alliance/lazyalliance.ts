import { Universe } from "../universe/universe";

/**Reference to an alliance
 * @category alliance
  */
export class LazyAlliance {

    /**Alliance's name */
    public readonly name: string;

    /**Alliance's public string identifier */
    public readonly tag: string;

    /**Alliance's identifier */
    public readonly id: string;

    public constructor(encodedData: XMLLazyAlliance, public readonly universe: Universe, public readonly timestamp: string) {

        this.name = encodedData.name;
        this.tag = encodedData.tag;
        this.id = encodedData.id;
    
    }

}

export interface XMLLazyAlliance {
    name: string;
    tag: string;
    id: string;
}
