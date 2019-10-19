import { Locale } from "../localization/localization";

/**@category report */
export const parseReport = (encodedData: string): [string, Map<ReportLocale, number>] => {

    const props = new Map<ReportLocale, number>();

    const [rawCoords, ...pairedProps] = encodedData.split("|");
    const coords = rawCoords.substr(7);

    for(const pairedProp of pairedProps) {

        const [key, value] = pairedProp.split(";");

        props.set(key as ReportLocale, Number.parseInt(value));

    }

    return [coords, props];

}

type ReportLocale = (typeof Locale)["ANTI_BALLISTIC_MISSILES" | "INTERPLANETARY_MISSILES" | "SMALL_CARGO" | "LARGE_CARGO" | "LIGHT_FIGHTER" | "HEAVY_FIGHTER" | "CRUISER" | "BATTLESHIP" | "COLONY_SHIP" | "RECYCLER" | "ESPIONAGE_PROBE" | "BOMBER" | "SOLAR_SATELLITE" | "CRAWLER" | "TRADE_SHIP" | "DESTROYER" | "DEATHSTAR" | "REAPER" | "PATHFINDER" | "BATTLECRUISER" | "ROCKET_LAUNCHER" | "LIGHT_LASER" | "HEAVY_LASER" | "GAUSS_CANNON" | "ION_CANNON" | "PLASMA_TURRET" | "SMALL_SHIELD_DOME" | "LARGE_SHIELD_DOME"];