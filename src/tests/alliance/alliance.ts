import test from "ava";
import Alliance, { XMLAlliance } from "../../alliance/alliance";
import Universe from "../..";
import { XMLAllianceData } from "../../alliance/alliancedata";
import { XMLLazyPlayer } from "../../player/lazyplayer";
import { requireXml, XMLContext } from "..";

type Context = XMLContext<XMLAllianceData>;

const universe = new Universe(800, "en");

const before = requireXml("alliance.json");
test.serial.before(before);


test.serial("constructor", t => {

    const encodedData = (t.context as Context).xml;

    t.notThrows(() => {

        new Alliance(encodedData.alliance as XMLAlliance, universe, encodedData.timestamp);

    });

});

test.serial("properties", t => {

    const encodedData = (t.context as Context).xml;
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

    const encodedData = (t.context as Context).xml;
    const encAlliance = encodedData.alliance as XMLAlliance;

    const members = Alliance.prototype["parseMembers"](encAlliance.player);

    t.truthy(members.length);
    t.deepEqual(members[0].id, (encAlliance.player as XMLLazyPlayer).id);

});