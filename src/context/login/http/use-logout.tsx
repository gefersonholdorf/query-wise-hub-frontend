import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout() {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/api/v1/auth/logout`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!response.ok) {
                throw new Error('Error. Unable to logout.');
            }
        },
        onSuccess: () => {
            toast.success("Logout realizado com sucesso!", {
                style: {
                    background: '#4fb353',
                    color: '#fff',
                    border: '#4fb353'
                },
            })
        },
        onError: () => {
            toast.error("Erro ao realizar logout!", {
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