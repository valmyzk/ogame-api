import test from "ava";
import { XMLContext, requireXml } from "..";
import { parseXml, XMLServerData } from "../../universe/serverData";

type Context = XMLContext<XMLServerData>;

const before = requireXml("serverData.json");
test.serial.before(before);

const booleanValues = ["acs", "rapidFire", "donutGalaxy", "donutSystem", "wfEnabled"];

test.serial.skip("parseXml", t => {

    const { xml } = (t.context as Context);
    let serverData = undefined as unknown as ReturnType<typeof parseXml>;

    t.notThrows(() => {

        //serverData = parseXml(xml);

    });

    for(const [key, value] of Object.entries(xml)) {

        const val = booleanValues.includes(key) ? !!value : value;

        t.deepEqual(val, serverData.get(key));

    }

});