"use server"
import axios from "axios";
import { User, AuthResponse, LoginCredentials } from "../types/index";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Création d'une instance axios avec config de base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Gestion des types d'erreur
interface ApiError {
    message: string;
    status?: number;
}

export const registerUser = async (newUser: LoginCredentials): Promise<User> => {
    try {
        const response = await api.post('/register', newUser);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription";
            throw new Error(errorMessage);
        }
        throw new Error("Erreur inattendue lors de l'inscription");
    }
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Échec de la connexion";
            throw new Error(errorMessage);
        }
        throw new Error("Erreur inattendue lors de la connexion");
    }
};

export const validateToken = async (token: string): Promise<User> => {
    try {
        const response = await axios.get('/validate', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Token invalide";
            throw new Error(errorMessage);
        }
        throw new Error("Erreur lors de la validation du token");
    }
};