import test, { ExecutionContext } from "ava";
import * as OGameAPI from "../index";
import { join } from "path";
import { readFile as readFileCb } from "fs";
import { promisify } from "util";
import Universe from "../universe/universe";
import { Coords } from "../universe/coords";

const readFile = promisify(readFileCb);

export const xmlPath: string = join(__dirname, "../", "../", "src", "tests", "json");

export const requireXml = (filename: string) => {

    const path = join(xmlPath, filename);

    return async (t: ExecutionContext<unknown>) => {

        const file = await readFile(path).then(v => v.toString()).catch(v => t.fail(v)) as string;

        (t.context as any).xml = JSON.parse(file);

    }

}

export interface XMLContext<T> {

    xml: T;

}

/**Test runtime exports */
test.serial("exports", t => {

    t.deepEqual(OGameAPI.default, Universe);
    t.deepEqual(OGameAPI.Universe, Universe);
    t.deepEqual(OGameAPI.default, OGameAPI.Universe);
    t.deepEqual(OGameAPI.Coords, Coords);

});

export function newAbstract<T extends Newable>(newable: T, ...args: ConstructorParameters<T>): InstanceType<T> {

    return new newable(...args);

}

interface Newable {

    new(...args: any[]): any;

}