import { Universe, IDResolvable, RegionResolvable } from "./universe";

export default class ServerData<T extends IDResolvable> {

    public readonly timestamp!: number;
    public readonly serverId!: string;
    public readonly name!: string;
    public readonly number!: number;
    public readonly language!: RegionResolvable;
    public readonly timezone!: string;
    public readonly timezoneOffset!: string;
    public readonly domain!: string;
    public readonly version!: string;
    public readonly speed!: number;
    public readonly speedFleet!: number;
    public readonly galaxies!: number;
    public readonly systems!: number;
    public readonly acs!: boolean;
    public readonly rapidFire!: boolean;
    public readonly defToTF!: number;
    public readonly debrisFactor!: number;
    public readonly debrisFactorDef!: number;
    public readonly repairFactor!: number;
    public readonly newbieProtectionLimit!: number;
    public readonly newbieProtectionHigh!: number;
    public readonly topScore!: number;
    public readonly bonusFields!: number;
    public readonly donutGalaxy!: boolean;
    public readonly donutSystem!: boolean;
    public readonly wfEnabled!: boolean;
    public readonly wfMinimumRessLost!: number;
    public readonly wfMinimumLossPercentage!: number;
    public readonly wfBasicPercentageRepairable!: number;
    public readonly globalDeuteriumSaveFactor!: number;
    public readonly bashLimit!: number;
    public readonly probeCargo!: number;
    public readonly researchDurationDivisor!: number;
    public readonly darkMatterNewAccount!: number;

    public constructor(encodedData: XMLServerData, public readonly universe: Universe<T>) {

        this.acs = !!encodedData.acs;
        this.rapidFire = !!encodedData.rapidFire;
        this.donutGalaxy = !!encodedData.donutGalaxy;
        this.donutSystem = !!encodedData.donutSystem;
        this.wfEnabled = !!encodedData.wfEnabled;

        this.parseData(encodedData);
    
    }

    private parseData(data: XMLServerData): void {

        Object.assign(this, data);

    }

}

export interface XMLServerData {
    [key: string]: string | boolean | number;
}
