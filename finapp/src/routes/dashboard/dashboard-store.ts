import { writable, type Writable } from "svelte/store";

export class DashboardStore {
   static monthYear = writable({num: 8, name: "", year: 2023})
}