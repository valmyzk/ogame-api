import test from "ava";
import { Universe, downloadXml, parseXml } from "../../universe/universe";
import OGameAPI from "../..";
import PlayerData from "../../player/playerdata";
import PlanetData from "../../planet/planetdata";
import AllianceData from "../../alliance/alliancedata";
import { ReferencedPosition } from "../../position/position";
import ServerData from "../../universe/serverData";
import { PlanetReport } from "../../report/planet";

const universe = OGameAPI.getUniverse(800, "en");

test.todo("constructor");

test.serial("parseEndpoint", t => {

    const numerical = Universe["parseEndpoint"](800, "en");
    const alphabetical = Universe["parseEndpoint"]("Dorado", "es");

    t.deepEqual(numerical, "https://s800-en.ogame.gameforge.com/api");
    t.deepEqual(alphabetical, "https://dorado-es.ogame.gameforge.com/api");

});

test.serial("properties", t => {

    t.truthy(universe.id);
    t.truthy(universe.region);
    t.falsy(universe.planets);
    t.falsy(universe.alliances);
    t.falsy(universe.players);

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

    const universe = OGameAPI.getUniverse(800, "en");

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

        if(!Array.isArray(data) || !(data[0] instanceof ReferencedPosition)) {

            t.fail();

        }

    });

});

test.serial("getNearbyUniverses", async t => {

    await t.notThrowsAsync(() => universe.getPlayerData());

    universe.getNearbyUniverses().then(data => {

        if(!Array.isArray(data) || !(data[0] instanceof Universe)) {

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

test.serial("createPlanetReport", t => {

    t.notThrows(() => universe.createPlanetReport("coords;0:0:0|0;0"));

    if(!(universe.createPlanetReport("coords;0:0:0|0;0") instanceof PlanetReport)) {

        t.fail();

    }

});