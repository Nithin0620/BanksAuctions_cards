import { create } from 'zustand';
import toast from 'react-hot-toast';
interface Alert {
    id: Number;
    selected: string[];
    [key: string]: any;
}

interface AlertStore {
    alerts: Alert[];
    addAlert: (alert: Alert) => void;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
    alerts: JSON.parse(localStorage.getItem('alerts') || '[]'),

    addAlert: (alert: Alert) => {
        const currentAlerts = get().alerts;
        const exists = currentAlerts.find(a => a.id === alert.id);

        let updatedAlerts: Alert[];
        if (exists) {
            updatedAlerts = currentAlerts.map(a => a.id === alert.id ? alert : a);
        } else {
            updatedAlerts = [...currentAlerts, alert];
        }

        set({ alerts: updatedAlerts });
        toast.success("Alert added successfully")
        localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
    },
}));
