/** biome-ignore-all lint/suspicious/noRedeclare: <"explanation"> */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export interface ChatRequest {
    message: string
}

export interface ChatResponse {
    message: string
}

export function useChat() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['chat'],
        mutationFn: async (data: ChatRequest) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (res.status !== 200) {
                throw new Error("Erro ao processar mensagem")
            }

            const response: ChatResponse = await res.json()

            return response
        },
        onError: () => {
            toast.error("Erro ao processar mensagem.", {
                position: 'top-center'
            })
        }
    })
}