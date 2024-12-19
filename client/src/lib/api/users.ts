import axios from "axios";
import { User } from "../types/index";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createUser = async (newUser: {
    email: string;
    password: string;
}): Promise<User | null> => {
    try {
        const response = await axios.post(`${API_URL}/register`, newUser);
        return response.data;
    } catch (error) {
        console.error("Erreur de création d'un utilisateur :", error);
        return null;
    }
};


export const loginUser = async (existingUser: {
    email: string;
    password: string;
}): Promise<User | null> => {
    try {
        const response = await axios.post(`${API_URL}/login`, existingUser);
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion d'un utilisateur :", error);
        return null;
    }
};
