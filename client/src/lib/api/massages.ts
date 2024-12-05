import axios from "axios";
import { Massage } from "../types/index";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getMassages = async (): Promise<Massage[]> => {
    try {
        const response = await axios.get(`${API_URL}/massages`);
        return response.data;
    } catch (error) {
        console.error('Erreur de récupération des massages', error);
    }
}

export const getMassageById = async (id: number): Promise<Massage | null> => {
    try {
        const response = await axios.get(`${API_URL}/massages/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur de récupération du massage ${id}`, error);
        return null;
    }
}
