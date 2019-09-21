import test from "ava";
import LazyAlliance, { XMLLazyAlliance } from "../../alliance/lazyalliance";
import Universe from "../..";
import { XMLContext, requireXml } from "..";

type Context = XMLContext<XMLLazyAlliance>;

const universe = new Universe(800, "en");

const before = requireXml("lazyalliance.json");
test.serial.before(before);

test.serial("constructor", t => {

    const encodedData = (t.context as Context).xml;

    t.notThrows(() => new LazyAlliance(encodedData, universe, "1337"));

});

test.serial("properties", t => {

    const encodedData = (t.context as Context).xml;
    const alliance = new LazyAlliance(encodedData, universe, "1337");

    t.deepEqual(alliance.id, encodedData.id);
    t.deepEqual(alliance.name, encodedData.name);
    t.deepEqual(alliance.tag, encodedData.tag);
    t.deepEqual(alliance.timestamp, "1337");
    t.deepEqual(alliance.universe, universe);

});