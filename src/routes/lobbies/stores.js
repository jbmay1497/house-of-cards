import { writable } from "svelte/store";

export const new_usernames = writable([]);

export function updateLobby(data) {
    console.log(`Updating lobby`);
    new_usernames.set(data.usernames);
}