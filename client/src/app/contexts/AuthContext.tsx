"use client"
import { User, LoginCredentials } from '@/src/lib/types';
import { loginUser, validateToken } from '@/src/lib/api/users';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<User | undefined>;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateUserToken = async (token: string) => {
            try {
                const userData = await validateToken(token);
                if (typeof userData !== 'string') {
                    setUser(userData);
                }
            } catch (error) {
                localStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            validateUserToken(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await loginUser(credentials);
            if (typeof response !== 'string' && response.token && response.user) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                console.log('User set after login:', response.user);
                return response.user;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isLoading
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