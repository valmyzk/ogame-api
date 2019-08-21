import test from "ava";
import { promisify } from "util";
import { readFile as readFileCb } from "fs";
import Alliance, { XMLAlliance } from "../../alliance/alliance";
import { join } from "path";
import OGameAPI from "../..";
import { XMLAllianceData } from "../../alliance/alliancedata";
import { XMLLazyPlayer } from "../../player/lazyplayer";
import { Solo } from "../../typings/util";

const readFile = promisify(readFileCb);

//Tests are in /out
const xmlPath = join(__dirname, "../", "../", "../", "src", "tests", "json", "alliance.json");

interface Context {

    sampleData: XMLAllianceData;

}

const universe = OGameAPI.getUniverse(800, "en");

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

test.serial("parseMembersSolo", t => {

    const encodedData = (t.context as Context).sampleData;
    const encAlliance = encodedData.alliance as XMLAlliance;
    const alliance = {members: [] as XMLLazyPlayer[]};
    const parseMembers = Alliance.prototype["parseMembers"].bind(alliance);

    parseMembers(encAlliance.player);

    t.truthy(alliance.members.length);
    t.deepEqual(alliance.members[0].id, (encAlliance.player as XMLLazyPlayer).id);

});

test.serial("parseMembersMultiple", t => {

    const encodedData = (t.context as Context).sampleData;
    const encAlliance = encodedData.alliance as XMLAlliance;
    const alliance = {members: [] as XMLLazyPlayer[]};
    const parseMembers = Alliance.prototype["parseMembers"].bind(alliance);

    parseMembers([encAlliance.player, encAlliance.player] as Solo<XMLLazyPlayer>);

    t.truthy(alliance.members.length);
    t.deepEqual(alliance.members[0].id, (encAlliance.player as XMLLazyPlayer).id);

});