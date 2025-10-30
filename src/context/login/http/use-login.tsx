import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface LoginRequest {
    login: string
    password: string
}
export interface LoginResponse {
    token: string
}

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: LoginRequest) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Error. Unable to login.');
            }

            const responseData: LoginResponse = await response.json();
            return responseData;
        },
        onSuccess: () => {
            toast.success("Login efetuado com sucesso!", {
                position: 'top-center'
            })

            navigate('/initial-page')
        },
        onError: () => {
            toast.error("Erro ao realizar login!", {
                position: 'top-center'
            })
        }
    })
}