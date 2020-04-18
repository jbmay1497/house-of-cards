import { writable } from "svelte/store";
import {get} from "svelte/store";

export const new_usernames = writable([]);
export const cur_host = writable("");

export function updateLobby(data) {
    console.log(`Updating lobby`);
    new_usernames.set(data.usernames);
    cur_host.set(data.host ? data.host : get(cur_host));
    console.log(cur_host);
}