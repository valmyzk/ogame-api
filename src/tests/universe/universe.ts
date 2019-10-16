import test from "ava";
import { Universe } from "../..";
import { XMLContext, requireXml } from "..";
import { XMLUniverse } from "../../universe/universe";
import { XMLUniverses } from "../../universe/universes";
import { resolveSolo } from "../../xml";

type Context = XMLContext<XMLUniverse>;

const universe = new Universe(800, "en");

const before = requireXml("universes.json");
test.serial.before(before);

test.serial.before(t => {
    
    const solo = (t.context as XMLContext<XMLUniverses>).xml.universe;
    (t.context as Context).xml = resolveSolo(solo)[0];

});

test.serial("constructor", t => {

    const encodedData = (t.context as Context).xml;

    t.notThrows(() => new Universe(encodedData));

});

test.serial("parseEndpoint", t => {

    const numerical = Universe["parseEndpoint"](800, "en");
    const alphabetical = Universe["parseEndpoint"]("Dorado", "es");
    const raw = Universe["parseEndpoint"]("https://hyperion-en.ogame.nova.com/api");
    const xml = Universe["parseEndpoint"]({
        href: "https://s999-en.ogame.gameforge.com",
        id: "999"
    });

    t.deepEqual(numerical, "https://s800-en.ogame.gameforge.com/api");
    t.deepEqual(alphabetical, "https://dorado-es.ogame.gameforge.com/api");
    t.deepEqual(raw, "https://hyperion-en.ogame.nova.com/api");
    t.deepEqual(xml, "https://s999-en.ogame.gameforge.com");


});

test.serial("properties", t => {

    t.truthy(universe.endpoint);

});