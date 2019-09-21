import test from "ava";
import { XMLContext, requireXml } from "..";
import parseXml, { XMLPlanetData } from "../../planet/planetdata";
import Universe from "../..";
import { resolveSolo } from "../../universe/universe";

type Context = XMLContext<XMLPlanetData>;

const universe = new Universe(800, "en");

const before = requireXml("planetData.json");
test.serial.before(before);

test.serial("parseXml", t => {

    const xml = (t.context as Context).xml;
    let planetData = undefined as unknown as ReturnType<typeof parseXml>;

    t.notThrows(() => {

        planetData = parseXml(xml, universe);

    });

    const solo = resolveSolo(xml.planet);
    t.deepEqual(planetData.length, solo.length);

});