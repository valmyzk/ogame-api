import test from "ava";
import Universe from "../..";
import PlayerData from "../../player/playerdata";
import PlanetData from "../../planet/planetdata";
import AllianceData from "../../alliance/alliancedata";
import ServerData from "../../universe/serverData";
import Position from "../../position/position";
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

test.serial("getPlayerData", async t => {

    await t.notThrowsAsync(() => universe.getPlayerData());

    universe.getPlayerData().then(data => {

        if(!(data instanceof PlayerData)) {

            t.fail();

        }

    });

});

test.serial("getPlanetData", async t => {

    await t.notThrowsAsync(() => universe.getPlayerData());

    universe.getPlanetData().then(data => {

        if(!(data instanceof PlanetData)) {

            t.fail();

        }

    });

});

test.serial("getAllianceData", async t => {

    await t.notThrowsAsync(() => universe.getAllianceData());

    universe.getPlayerData().then(data => {

        if(!(data instanceof AllianceData)) {

            t.fail();

        }

    });

});

test.serial("getPlayerPositions", async t => {

    await t.notThrowsAsync(() => universe.getPlayerData());

    universe.getPlayerData().then(data => {

        if(!Array.isArray(data) || !(data[0] instanceof Position)) {

            t.fail();

        }

    });

});

test.serial("getServerData", async t => {

    await t.notThrowsAsync(() => universe.getPlayerData());

    universe.getServerData().then(data => {

        if(!(data instanceof ServerData)) {

            t.fail();

        }

    });

});

test.serial.todo("getPlayer");