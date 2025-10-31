import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface LoginRequest {
    login: string
    password: string
}
export interface LoginResponse {
    token: string
}

export function useLogin() {
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
            toast.success("Login realizado com sucesso!", {
                style: {
                    background: '#4fb353',
                    color: '#fff',
                    border: '1px solid #4fb353'
                },
            })
        },
        onError: () => {
            toast.error("Erro ao realizar login. Forneça as credenciais corretas!", {
                position: 'top-center',
                style: {
                    background: '#b30000',
                    color: '#fff',
                    border: '1px solid #b30000',
                },
            })
        }
    })
}