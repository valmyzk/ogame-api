import test from "ava";
import PlanetReport from "../../report/planet";
import LocalizationData from "../../localization/localizationData";
import { Coords } from "../../universe/coords";
import Universe from "../..";

const sampleData = "coords;0:0:0|0;0|1;2";
test.serial("constructor", t => {

    t.notThrows(() => new PlanetReport(sampleData, new Universe(800, "en")));

});

test.serial("parseString", t => {

    const report = {props: new Map(), coords: null};
    const parseString = PlanetReport.prototype["parseString"].bind(report);
    
    t.notThrows(() => parseString(sampleData));
    t.deepEqual(report.coords as unknown as Coords, new Coords(0, 0, 0));
    
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

test.serial("toString", t => {

    const report = new PlanetReport(sampleData, new Universe(800, "en"));
    
    t.deepEqual(report.toString(), sampleData);

});