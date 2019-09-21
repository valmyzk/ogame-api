import { Coords } from "../universe/coords";
import { ID, Region } from "../universe/universe";
import Localization, { LocalizationType } from "../localization/localization";
import Universe from "../universe/universe";
import { LocalizationMap } from "../localization/localizationData";
import { Writable } from "../../typings/util";

type ReportMap = Map<string, ReportValue>;

/**@category report */
export default class PlanetReport {

    /**Report's planet coordinates */
    public readonly coords!: Coords;

    /**Report properties mapped by localization id (not parsed) */
    public readonly props: Map<number, LazyReportValue> = new Map();

    /**Report's planet technology
     * @parsed
     */
    public readonly techs: ReportMap = new Map();

    /**Report's planet defense
     * @parsed
     */
    public readonly defense: ReportMap = new Map();

    /**Report's planet fleet
     * @parsed
     */
    public readonly fleet: ReportMap = new Map();

    /**Unknown report entries
     * @parsed
     */
    public readonly unknown: ReportMap = new Map();

    public constructor(encodedData: string) {

        this.parseString(encodedData);

    }

    /**Parses a raw encoded string into LazyReportValues + coords */
    private parseString(raw: string) {

        const sectioned = raw.split("|");
        const rawCoords = (sectioned.shift() as string).slice(7);

        (this as Writable<this>).coords = Coords.fromString(rawCoords);

        //Fill this.props
        for(const valuePair of sectioned) {
            
            //valuePair = localizationType:quantity
            const [id, value] = valuePair.split(";");

            const reportValue: LazyReportValue = {
                id,
                value: parseInt(value),
                type: Localization.getLocalizationType(id)
            };

            this.props.set(parseInt(id), reportValue);

        }

    }

    /**Used for getting universe localizations
     */
    protected getUniverseLocalizations<I extends ID>(id: I, region: Region) {

        return new Universe(id, region)
            .getLocalizations();

    }

    /**Filters LocalizationData to get requestes Localization entry
     * @todo Add support for unknown localizations
     */
    private getLocalizationName<I extends ID>(reportValue: LazyReportValue, localizationData: LocalizationMap<I>): string {

        const localization = localizationData.get("techs")
            .filter(localization => localization.id === reportValue.id)[0] as Localization<I>;

        if(!localization) {

            return [...localizationData.entries()]
                    .filter(([key, _]) => key !== "techs" && key !== "missions")
                    .map(([_, value]) => value.filter(localization => localization.id === reportValue.id))[0][1].name;

        }

        return localization.name;

    }

    /**Parses the properties and assigns them on a group using LocalizationData
     * @important
     */
    public async mapLocalizations<I extends ID>(id?: I, region: Region = "en") {

        const localizationData = await this.getUniverseLocalizations(id || 800, region);
        
        this.props.forEach(value => {

            const name = this.getLocalizationName(value, localizationData);

            const newValue = Object.assign({}, value);
            (newValue as ReportValue).name = name;

            this[value.type].set(name, newValue as ReportValue);

        });

        return this;

    }

    /**Parses **this.props** into an encoded raw string */
    public toString() {

        const coordsHeader = `coords;${this.coords.toString()}`;
        const props = Array.from(this.props, ([,report]) => `${report.id};${report.value}`);

        return `${coordsHeader}|${props.join("|")}`;

    }

}

interface LazyReportValue {

    id: string;
    type: LocalizationType;
    value: number;

}

interface ReportValue extends LazyReportValue {

    name: string;

}