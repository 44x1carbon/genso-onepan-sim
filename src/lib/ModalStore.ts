import { writable } from "svelte/store";

export const modalStore = writable<ConstructorOfATypedSvelteComponent | undefined>(undefined)

export const modalDataStore = writable<any | undefined>(undefined)

export const updateModal = (modal: ConstructorOfATypedSvelteComponent, data: any = {}) => {
    modalStore.update(() => modal)
    modalDataStore.update(() => data)
}

export const closeModal = () => {
    modalStore.update(() => undefined)
    modalDataStore.update(() => undefined)
}