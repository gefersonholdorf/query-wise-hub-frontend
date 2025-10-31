/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <"explanation"> */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

export interface User {
    id: number;
    email: string;
    cpf: string;
    username: string;
    fileName: string | null;
    fullName: string;
    role: "COMMON" | "ADMIN" | "EMPLOYEE";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    lastLogin: Date;
}

export interface UserResponse {
    user: User;
}

export interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (token: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    isAuthenticated: false,
    signIn: async () => { },
    signOut: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

    const navigate = useNavigate()

    useEffect(() => {
        const authenticate = async () => {
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            if (!user) {
                try {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/v1/users/me`, {
                        headers: { authorization: `Bearer ${token}` },
                    });

                    if (!res.ok) throw new Error("Erro ao buscar dados do usuário.");

                    const response: UserResponse = await res.json();
                    setUser(response.user);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    setIsAuthenticated(true);

                    navigate('/initial-page');
                } catch (err) {
                    console.error("Erro na autenticação:", err);
                    setUser(null);
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } else {
                setIsAuthenticated(true);
            }
        };

        authenticate();
    }, [token]);

    async function signIn(token: string) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
