import { UniverseCoords } from "../universe/coords";
import Universe, { ID, Region } from "../universe/universe";
import Localization, { LocalizationType } from "../localization/localization";
import OGameAPI from "..";
import { LocalizationMap } from "../localization/localizationData";
import Planet from "../planet/planet";
import { Writable } from "../typings/util";

type ReportMap = Map<string, ReportValue>;

export default class PlanetReport<T extends ID> {

    public readonly coords!: UniverseCoords<T>;
    public readonly props: Map<number, LazyReportValue> = new Map();
    public readonly techs: ReportMap = new Map();
    public readonly defense: ReportMap = new Map();
    public readonly fleet: ReportMap = new Map();
    public readonly unknown: ReportMap = new Map();

    public constructor(encodedData: string, public readonly universe: Universe<T>) {

        this.parseString(encodedData);

    }

    private parseString(raw: string) {

        const sectioned = raw.split("|");
        const rawCoords = (sectioned.shift() as string).slice(7);

        (this as Writable<this>).coords = UniverseCoords.parse(rawCoords, this.universe);

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

    protected getUniverseLocalizations<I extends ID>(id: I, region: Region) {

        return OGameAPI.getUniverse(id, region)
            .getLocalizations();

    }

    private getLocalizationName<I extends ID>(reportValue: LazyReportValue, localizationData: LocalizationMap<I>) {

        const localization = localizationData.get("techs")
            .filter(localization => localization.id === reportValue.id)[0] as Localization<I>;

        //TODO: Add support for unknown localizations

        return localization.name;

    }

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

    public async getPlanet() {

        const planetData = await this.universe.getPlanetData();

        const planet = planetData.filter(planet => {
            
            return planet.coords.equals(this.coords);

        })[0] as Planet<T>;

        return planet;

    }

    public toString() {

        const coordsHeader = `coords;${this.coords.toString()}`;
        const props = [...this.props.values()].map(report => `${report.id};${report.value}`);

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