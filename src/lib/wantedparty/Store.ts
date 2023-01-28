import { writable } from "svelte/store";
import type { WantedParty } from "./WantedParty";

export const wantedPartyListStore = writable([] as WantedParty[])