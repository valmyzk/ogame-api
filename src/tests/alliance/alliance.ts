import test from "ava";
import { promisify } from "util";
import { readFile as readFileCb } from "fs";
import Alliance, { XMLAlliance } from "../../alliance/alliance";
import { join } from "path";
import Universe from "../..";
import { XMLAllianceData } from "../../alliance/alliancedata";
import { XMLLazyPlayer } from "../../player/lazyplayer";

const readFile = promisify(readFileCb);

//Tests are in /out
const xmlPath = join(__dirname, "../", "../", "../", "src", "tests", "json", "alliance.json");

interface Context {

    sampleData: XMLAllianceData;

}

const universe = new Universe(800, "en");

test.serial.before(async t => {

    const encodedData = await readFile(xmlPath).then(b => b.toString()).catch(t.fail);
    
    if(encodedData) {

        (t.context as Context).sampleData = JSON.parse(encodedData) as XMLAllianceData;

    }

});

test.serial("constructor", t => {

    const encodedData = (t.context as Context).sampleData;

    t.notThrows(() => {

        new Alliance(encodedData.alliance as XMLAlliance, universe, encodedData.timestamp);

    });

});

test.serial("properties", t => {

    const encodedData = (t.context as Context).sampleData;
    const encAlliance = encodedData.alliance as XMLAlliance;
    const alliance = new Alliance(encAlliance, universe, encodedData.timestamp);

    t.deepEqual(alliance.timestamp, encodedData.timestamp);
    t.deepEqual(alliance.id, encAlliance.id);
    t.deepEqual(alliance.name, encAlliance.name);
    t.deepEqual(alliance.tag, encAlliance.tag);
    t.deepEqual(alliance.foundDate, encAlliance.foundDate);
    t.deepEqual(alliance.logo, encAlliance.logo);
    t.deepEqual(alliance.open, !!encAlliance.open);
    t.deepEqual(alliance.homepage, encAlliance.homepage);

});

test.serial("parseMembers", t => {

    const encodedData = (t.context as Context).sampleData;
    const encAlliance = encodedData.alliance as XMLAlliance;

    const members = Alliance.prototype["parseMembers"](encAlliance.player);

    t.truthy(members.length);
    t.deepEqual(members[0].id, (encAlliance.player as XMLLazyPlayer).id);

});