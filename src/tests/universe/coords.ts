import test from "ava";
import { Coords } from "../../universe/coords";

test("constructor", t => {

    t.plan(0);
    new Coords(0, 0, 0);

});

test("toString", t => {

    const coords = new Coords(0, 0, 0);

    t.deepEqual(coords.toString(), "0:0:0");

});

test("equals", t => {

    const coords = new Coords(0, 0, 0);
    const assert = new Coords(0, 0, 0);

    t.true(coords.equals(assert));

});

test("jsEquals", t => {

    const coords = new Coords(0, 0, 0);
    const assert = new Coords(0, 0, 0);

    t.deepEqual(coords, assert);

});