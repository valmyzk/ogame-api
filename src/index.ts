import { Universe, IDResolvable, RegionResolvable } from "./universe/universe";
import { Writable } from "./typings/util";

//"Static" class
export default abstract class OGameAPI {

    public static getUniverse<T extends IDResolvable>(id: T, region: RegionResolvable) {

        const universe = Object.create(Universe.prototype) as Writable<Universe<T>>;

        universe.id = id;
        universe.region = region;

        return universe as Universe<T>;

    }

}