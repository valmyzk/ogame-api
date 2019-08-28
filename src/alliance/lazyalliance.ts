import Universe, { ID } from "../universe/universe";

/**Reference to an alliance
 * @category alliance
  */
export default class LazyAlliance<T extends ID> {

    /**Alliance's name */
    public readonly name: string;

    /**Alliance's public string identifier */
    public readonly tag: string;

    /**Alliance's identifier */
    public readonly id: string;

    public constructor(encodedData: XMLLazyAlliance, public readonly universe: Universe<T>, public readonly timestamp: string) {

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
