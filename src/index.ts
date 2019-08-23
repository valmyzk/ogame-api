import { Universe, ID, Region } from "./universe/universe";
import { Writable } from "./typings/util";

//"Static" class
export default abstract class OGameAPI {

    public static getUniverse<T extends ID>(id: T, region: Region) {

        const universe = Object.create(Universe.prototype) as Writable<Universe<T>>;

        universe.id = id;
        universe.region = region;

        return universe as Universe<T>;

    }

}