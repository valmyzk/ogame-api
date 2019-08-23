import test from "ava";
import OGameAPI from "..";
import Universe from "../universe/universe";


test("getUniverse", t => {

    t.notThrows(() => {

        const universe = OGameAPI.getUniverse(800, "en");

        if(!(universe instanceof Universe)) {

            t.fail();

        }
    });

});