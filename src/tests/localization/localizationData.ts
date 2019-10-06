import test from "ava";
import { XMLContext, requireXml } from "..";
import parseXml, { XMLLocalizationData, XMLLocalizationGroup } from "../../localization/localizationData";
import Universe from "../..";
import { resolveSolo } from "../../xml";

type Context = XMLContext<XMLLocalizationData>;

const universe = new Universe(800, "en");

const before = requireXml("localizationData.json");
test.serial.before(before);

test.serial("parseXml", t => {

    const { xml } = (t.context as Context);
    let localizationData = undefined as unknown as ReturnType<typeof parseXml>;
    
    t.notThrows(() => {

        localizationData = parseXml(xml, universe);

    });

    const length = [...localizationData.values()]
        .map(group => group.length)
        .reduce((acc, val) => acc + val);

    t.deepEqual(localizationData.size, 2);
    t.deepEqual(length, 3);

});

function getLocalizationEntries(xml: XMLLocalizationData) {

    return Object.entries(xml)
            .filter(([, value]) => typeof value === "object")
            .map(([, value]) => resolveSolo((value as XMLLocalizationGroup).name))


}