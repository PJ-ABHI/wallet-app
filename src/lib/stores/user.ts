import { writable } from 'svelte/store';

export const userAvatar = writable<string | null>(null);
