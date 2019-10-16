import test from "ava";
import { PlanetReport } from "../../report/planet";
import { Coords } from "../../universe/coords";

const sampleData = "coords;0:0:0|0;0|1;2";
test.serial("constructor", t => {

    t.notThrows(() => new PlanetReport(sampleData));

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

test.serial("toString", t => {

    const report = new PlanetReport(sampleData);
    
    t.deepEqual(report.toString(), sampleData);

});