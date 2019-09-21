import test from "ava";
import Moon, { XMLMoon } from "../../planet/moon";
import { XMLContext, requireXml } from "..";
import Universe, { Coords } from "../..";
import { XMLPlanetData } from "../../planet/planetdata";
import { resolveSolo } from "../../universe/universe";
import { XMLUniversePlanet } from "../../planet/planet";

type Context = XMLContext<XMLMoon> & {timestamp: string, planet: XMLUniversePlanet};

const universe = new Universe(800, "en");

const before = requireXml("planetData.json");
test.serial.before(before);

test.serial.before(t => {

    const xml = (t.context as XMLContext<XMLPlanetData>).xml;
    (t.context as Context).timestamp = xml.timestamp;
    (t.context as Context).planet = resolveSolo(xml.planet).filter(p => p.moon)[0];
    (t.context as Context).xml = (t.context as Context).planet.moon as XMLMoon;

});

test.serial("constructor", t => {

    const ctx = (t.context as Context);

    t.notThrows(() => new Moon(ctx.xml, ctx.planet, universe, ctx.timestamp));

});

test.serial("properties", t => {

    const ctx = (t.context as Context);
    const moon = new Moon(ctx.xml, ctx.planet, universe, ctx.timestamp);

    t.deepEqual(moon.coords, Coords.fromString(ctx.planet.coords));
    t.deepEqual(moon.id, ctx.xml.id);
    t.deepEqual(moon.name, ctx.xml.name);
    t.deepEqual(moon.player.id, ctx.planet.player);
    t.deepEqual(moon.size, ctx.xml.size);
    t.deepEqual(moon.timestamp, ctx.timestamp);

});