import Universe, { ID } from "../universe/universe";

/**Single entry of the Localization API
 * @category localization
 */
export default class Localization<T extends ID> {

    /**Localization's identifier */
    public readonly id: string;

    /**Localization's name */
    public readonly name: string;

    public constructor(encodedData: XMLLocalization, public readonly universe: Universe<T>, public readonly timestamp: string) {

        this.id = encodedData.id;
        this.name = encodedData.text;
        this.universe = universe;
        this.timestamp = timestamp;
    
    }

    /**@returns Type of the localization */
    public static getLocalizationType(id: string): LocalizationType {

        const i = parseInt(id);
        if ((i >= 115 && i <= 118) || (i >= 109 && i <= 111)) {
    
            return "techs";
        
        }
        else if (i >= 202 && i <= 215) {
    
            return "fleet";
        
        }
        else if (i >= 401 && i <= 503) {
    
            return "defense";
        
        }
        else return "unknown";
    
    };

}

export interface XMLLocalization {
    text: string;
    id: string;
}

export type LocalizationType = "techs" | "fleet" | "defense" | "unknown";