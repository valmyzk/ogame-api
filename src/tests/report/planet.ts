import test, { ExecutionContext } from "ava";
import { PlanetReport } from "../../report/planet";
import OGameAPI from "../..";
import LocalizationData from "../../localization/localizationData";
import { UniverseCoords } from "../../universe/coords";
import PlanetData from "../../planet/planetdata";
import { Writable } from "../../typings/util";

const sampleData = "coords;0:0:0|0;0|1;2";
const universe = OGameAPI.getUniverse(800, "en");

test.serial("constructor", t => {

    t.notThrows(() => new PlanetReport(sampleData, universe));

});

test.serial("parseString", t => {

    const report = {props: new Map(), universe, coords: null};
    const parseString = PlanetReport.prototype["parseString"].bind(report);
    
    t.notThrows(() => parseString(sampleData));
    t.deepEqual(report.coords as unknown as UniverseCoords<800>, new UniverseCoords(0, 0, 0, universe));
    
    const [firstValue, secondValue] = [report.props.get(0), report.props.get(1)];

    t.deepEqual(firstValue, {

        id: "0",
        type: "unknown",
        value: 0

    });

    t.deepEqual(secondValue, {

        id: "1",
        type: "unknown",
        value: 2

    });

});

test.serial("getUniverseLocalizations", async t => {

    const getUniverseLocalizations = () => PlanetReport.prototype["getUniverseLocalizations"](800, "en");
    await t.notThrowsAsync(() => getUniverseLocalizations());

    getUniverseLocalizations().then(data => {

        if(!(data instanceof LocalizationData)) {

            t.fail();

        }

    });

});

test.serial("getPlanet", async t => {

    const patchedUniverse = OGameAPI.getUniverse(800, "en");
    const planet = {
        coords: UniverseCoords.fromString("0:0:0")
    } as any;

    patchedUniverse.getPlanetData = async () => {

        const planetData = Object.create(PlanetData.prototype) as PlanetData<800>;
        (planetData as Writable<PlanetData<800>>).planets = [planet];

        return planetData;

    };

    const report = patchedUniverse.createPlanetReport(sampleData);
    
    await t.notThrowsAsync(async () => {

        const reportPlanet = await report.getPlanet();
        t.deepEqual(reportPlanet, planet);

    });

});

test.serial("toString", t => {

    const report = universe.createPlanetReport(sampleData);
    
    t.deepEqual(report.toString(), sampleData);

});