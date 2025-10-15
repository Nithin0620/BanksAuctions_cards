import { create } from 'zustand';
import toast from 'react-hot-toast';

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
            toast.success("Item removed from Shortlist");
        } else {
            updatedList = [...current, id];
            toast.success("Item added to Shortlist");
        }

        set({ shortListed: updatedList });
        localStorage.setItem("shortListed", JSON.stringify(updatedList));
    },
}));
