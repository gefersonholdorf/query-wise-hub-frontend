import { useQuery } from "@tanstack/react-query";

export interface User {
    id: number;
    email: string;
    cpf: string;
    username: string;
    fileName: string | null;
    fullName: string;
    role: "COMMON" | "ADMIN" | 'EMPLOYEE';
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    lastLogin: Date;
}

export interface UserResponse {
    user: User;
}

export function useMe(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/users/me`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            })
            if (!res.ok) {
                throw new Error("Error. Unable to fetch user data.")
            }
            const response: UserResponse = await res.json()

            return response
        },
        enabled: options?.enabled ?? true,
        retry: false,
    })
}