import { Universe } from "../universe/universe";
import { Alliance, XMLAlliance } from "./alliance";
import { Solo } from "../../typings/util";
import { resolveSolo, APIAttributes } from "../xml";

/**Parses XML alliance root file to an Alliance array
 * @category alliance
 */
export function parseXml(encodedData: XMLAllianceData, universe: Universe) {

    const allianceArray = resolveSolo(encodedData.alliance);
    
    return allianceArray.map(alliance => 
      
        new Alliance(alliance, universe, encodedData.timestamp)

    ) as Alliance[];

}

export interface XMLAllianceData extends APIAttributes {

    alliance: Solo<XMLAlliance>;
    
}
