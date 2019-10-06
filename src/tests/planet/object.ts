import test from "ava";
import { XMLContext, requireXml, newAbstract } from "..";
import { XMLUniversePlanet } from "../../planet/planet";
import Universe, { Coords } from "../..";
import { XMLPlanetData } from "../../planet/planetdata";
import UniverseObject from "../../planet/object";
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

    //@ts-ignore
    t.notThrows(() => new UniverseObject(ctx.xml, universe, ctx.timestamp));

});

test.serial("properties", t => {

    const ctx = (t.context as Context);

    const object = new (UniverseObject as any)(ctx.xml, universe, ctx.timestamp) as UniverseObject;

    t.deepEqual(object.coords, ctx.xml.coords);
    t.deepEqual(object.id, ctx.xml.id);
    t.deepEqual(object.name, ctx.xml.name);
    t.deepEqual(object.player.id, ctx.xml.player);
    t.deepEqual(object.timestamp, ctx.timestamp);

});