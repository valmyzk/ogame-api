import test from "ava";
import { promisify } from "util";
import { join } from "path";
import LazyAlliance, { XMLLazyAlliance } from "../../alliance/lazyalliance";
import OGameAPI from "../..";
import { readFile as readFileCb } from "fs";

const readFile = promisify(readFileCb);

//Tests are in /out
const xmlPath = join(__dirname, "../", "../", "../", "src", "tests", "json", "lazyalliance.json");

interface Context {

    sampleData: XMLLazyAlliance;

}

const universe = OGameAPI.getUniverse(800, "en");

test.serial.before(async t => {

    const encodedData = await readFile(xmlPath).then(b => b.toString()).catch(t.fail);
    
    if(encodedData) {

        (t.context as Context).sampleData = JSON.parse(encodedData) as XMLLazyAlliance;

    }

});

test.serial("constructor", t => {

    const encodedData = (t.context as Context).sampleData;

    t.notThrows(() => new LazyAlliance(encodedData, universe, "1337"));

});

test.serial("properties", t => {

    const encodedData = (t.context as Context).sampleData;
    const alliance = new LazyAlliance(encodedData, universe, "1337");

    t.deepEqual(alliance.id, encodedData.id);
    t.deepEqual(alliance.name, encodedData.name);
    t.deepEqual(alliance.tag, encodedData.tag);
    t.deepEqual(alliance.timestamp, "1337");
    t.deepEqual(alliance.universe, universe);

});

test.serial("getAlliance", t => {

    const encodedData = (t.context as Context).sampleData;
    const patchedUniverse = OGameAPI.getUniverse(800, "en");
    const alliance = {

        id: "1337"

    } as any;

    patchedUniverse.getAllianceData = async () => {

        return [alliance];

    };
    const lazyAlliance = new LazyAlliance(encodedData, patchedUniverse, "1337");
    
    t.notThrows(() => lazyAlliance.getAlliance());

});