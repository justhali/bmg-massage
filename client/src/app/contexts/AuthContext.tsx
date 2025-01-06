"use client"
import { User, LoginCredentials } from '@/src/lib/types';
import { loginUser } from '@/src/lib/api/users';
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: User | null;
    token: string;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await loginUser(credentials);
            const isResponseValid = response && response.token && response.user;

            if (!isResponseValid) {
                throw new Error("Réponse invalide du serveur.");
            }

            setToken(response.token);
            setUser(response.user);
            localStorage.setItem('token', response.token);
            setUser(response.user);
        } catch (error) {
            console.error("Erreur lors du login :", error);
            throw new Error(error.message || "Erreur inattendue lors de la connexion.");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken("")
        setUser(null);
    };

    const value: AuthContextType = {
        isAuthenticated: user,
        token,
        login,
        logout
        // isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};