import { create } from 'zustand';

interface PropertyStore {
    shortListed: number[];
    toggleShortListed: (id: number) => void;
}

export const useShortListedStore = create<PropertyStore>((set, get) => ({
    shortListed:  JSON.parse(localStorage.getItem("shortListed") || "[]") ||  [],

    toggleShortListed: (id: number) => {
        const current = get().shortListed;
        let updatedList: number[];

        if (current.includes(id)) {
            updatedList = current.filter((item) => item !== id);
        } else {
            updatedList = [...current, id];
        }

        set({ shortListed: updatedList });
        localStorage.setItem("shortListed", JSON.stringify(updatedList));
    },
}));
