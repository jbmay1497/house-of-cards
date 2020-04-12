import { writable } from "svelte/store";
import { get } from 'svelte/store';


export const card_pos = writable([]);

export function updateCardPos(cur_card) {

    let new_card_pos = get(card_pos);
    new_card_pos[cur_card.index] = cur_card;
    card_pos.set(new_card_pos);
}

export function resetDeck(deck){
    card_pos.set(deck)
}