import { createContext, useContext, type ReactNode } from "react";
import { useMe, type UserResponse } from "./http/use-me";

interface AuthContextType {
    user: UserResponse | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("token");

    // só executa a requisição se existir token
    const { data, isLoading } = useMe({
        enabled: !!token,
    });

    // Se não há token, nem tenta buscar usuário
    if (!token) {
        return (
            <AuthContext.Provider value={{ user: null, isAuthenticated: false }}>
                {children}
            </AuthContext.Provider>
        );
    }

    // Exibe um loading básico enquanto busca os dados
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Carregando dados do usuário...
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isAuthenticated: !!data,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
