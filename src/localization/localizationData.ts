import { Universe, IDResolvable, APIAttributes } from "../universe/universe";
import { Writable } from "../typings/util";
import Localization, { XMLLocalization } from "./localization";

export default class LocalizationData<T extends IDResolvable> {

    public readonly techs!: Localization<T>[];
    public readonly missions!: Localization<T>[];
    public readonly unknown: {
        [key: string]: Localization<T>[] | undefined;
    } = {};
    public readonly timestamp: string;

    public constructor(encodedData: XMLLocalizationData, public readonly universe: Universe<T>) {

        this.timestamp = encodedData.timestamp;
        this.parseLocalizations(encodedData);
    
    }

    private parseLocalizations(localizations: XMLLocalizationData): void {

        for(const group in localizations) {

            const value = localizations[group];

            if(typeof value === "object") {

                const instancedLocalizations = value.name.map(localization => {

                    return new Localization<T>(localization, this.universe, this.timestamp);

                });

                if(group === "techs" || group === "missions") {

                    (this as Writable<this>)[group] = instancedLocalizations;

                }

                else {

                    this.unknown[group] = instancedLocalizations;

                }

            }

        }

    }

    public getLocalization(id: string): Localization<T> | undefined {

        //Scan known
        const localizations = [...this.techs, ...this.missions, ...this.getUnknown()];

        return localizations.filter(l => l.id === id)[0];
    
    }

    private getUnknown(): Localization<T>[] {

        const r = [];
        for (const entry in this.unknown) {

            const val: Localization<T>[] | undefined = this.unknown[entry];
            val && r.push(...val);
        
        }

        return r;
    
    }

}

export interface XMLLocalizationData extends APIAttributes {
    [key: string]:
    | (
        | {
            name: XMLLocalization[];
				  }
        | string)
    | undefined;
    timestamp: string;
}
