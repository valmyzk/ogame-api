import test from "ava";
import { Localization, XMLLocalization } from "../../localization/localization";
import { XMLContext, requireXml } from "..";
import { Universe } from "../..";
import { XMLLocalizationData, XMLLocalizationGroup } from "../../localization/localizationData";
import { resolveSolo } from "../../xml";

type Context = XMLContext<XMLLocalization> & {timestamp: string};

const universe = new Universe(800, "en");

const before = requireXml("localizationData.json");
test.serial.before(before);

test.serial.before(t => {

    const { xml } = (t.context as XMLContext<XMLLocalizationData>);
    const solo = resolveSolo((xml.techs as XMLLocalizationGroup).name);

    (t.context as Context).xml = solo[0];
    (t.context as Context).timestamp = xml.timestamp;

});

test.serial("constructor", t => {

    const { xml, timestamp } = (t.context as Context);

    t.notThrows(() => new Localization(xml, universe, timestamp));

});

test.serial("properties", t => {

    const { xml, timestamp } = (t.context as Context);
    const localization = new Localization(xml, universe, timestamp);

    t.deepEqual(localization.id, xml.id);
    t.deepEqual(localization.name, xml.text);
    t.deepEqual(localization.timestamp, timestamp);

});