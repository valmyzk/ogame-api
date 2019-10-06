import test from "ava";
import { Universe, Coords } from "../..";
import { XMLContext, requireXml } from "..";
import { Planet, XMLUniversePlanet } from "../../planet/planet";
import { XMLPlanetData } from "../../planet/planetdata";
import { resolveSolo } from "../../xml";

type Context = XMLContext<XMLUniversePlanet> & {timestamp: string};

const universe = new Universe(800, "en");

const before = requireXml("planetData.json");
test.serial.before(before);

test.serial.before(t => {

    const xml = (t.context as XMLContext<XMLPlanetData>).xml;
    (t.context as Context).timestamp = xml.timestamp;
    (t.context as Context).xml = resolveSolo(xml.planet)[0];

});


test.serial("constructor", t => {

    const ctx = (t.context as Context);

    t.notThrows(() => new Planet(ctx.xml, universe, ctx.timestamp));

});

test.serial("properties", t => {

    const ctx = (t.context as Context);

    const planet = new Planet(ctx.xml, universe, ctx.timestamp);

    t.deepEqual(planet.moon, ctx.xml.moon);

});