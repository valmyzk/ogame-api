import test from "ava";
import { XMLContext, requireXml } from "..";
import parseXml, { XMLAllianceData } from "../../alliance/alliancedata";
import Universe from "../../";
import { resolveSolo } from "../../xml";

type Context = XMLContext<XMLAllianceData>;

const universe = new Universe(800, "en");

const before = requireXml("alliance.json");
test.serial.before(before);

test.serial("parseXml", t => {

    const xml = (t.context as Context).xml;
    let allianceData = undefined as unknown as ReturnType<typeof parseXml>;

    t.notThrows(() => {

        allianceData = parseXml(xml, universe);

    });

    const solo = resolveSolo(xml.alliance);

    t.deepEqual(solo.length, allianceData.length);

});


