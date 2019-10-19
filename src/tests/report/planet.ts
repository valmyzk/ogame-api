import test from "ava";
import { parseReport } from "../../report/planet";
import { Locale } from "../../localization/localization";

test.serial("parseReport", t => {

    const encodedData = `coords;1:1:1|${Locale.LIGHT_FIGHTER};500|${Locale.DEATHSTAR};1`;
    const [coords, props] = parseReport(encodedData);

    t.deepEqual(coords, "1:1:1");

    t.deepEqual(props.size, 2);
    t.deepEqual(props.get(Locale.LIGHT_FIGHTER), 500);
    t.deepEqual(props.get(Locale.DEATHSTAR), 1);

});