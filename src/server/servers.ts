import { Region } from "../universe/universe";
import ifetch = require("isomorphic-fetch");
import { boolean } from "../xml";

export async function getServers() {

    const endpoint = "https://lobby.ogame.gameforge.com/api/servers";
    
    const result = await ifetch(endpoint).then(v => v.json()) as Server[];

    for(const server of result) {

        boolean(server, ["prefered", "serverClosed", "signupClosed"]);
        server.opened = new Date(server.opened).valueOf();
        server.startDate = new Date(server.startDate).valueOf();
        server.settings.aks = !!server.settings.aks;

    }

    return result;


}

interface Server {

    language: Region;
    number: number;
    name: string;
    playerCount: number;
    playersOnline: number;
    opened: number;
    startDate: number;
    serverClosed: boolean;
    prefered: boolean;
    signupClosed: boolean;
    settings: ServerSettings;

}
  
interface ServerSettings {

    aks: boolean;
    fleetSpeed: number;
    wreckField: number;
    serverLabel: string;
    economySpeed: number;
    planetFields: number;
    universeSize: number;
    serverCategory: ServerCategory;
    espionageProbeRaids: boolean;
    premiumValidationGift: number;
    debrisFieldFactorShips: number;
    debrisFieldFactorDefence: number;

}

type ServerCategory = "balanced" | "miner" | "fleeter";