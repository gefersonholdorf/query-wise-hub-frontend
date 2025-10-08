/** biome-ignore-all lint/complexity/noUselessTernary: <explanation> */
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { _ZodString, z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "../http/use-chat";
import type { IChatMessage } from "./main";

interface InputProps {
    messages: IChatMessage[]
    onSetMessage: (message?: IChatMessage, id?: string) => void
}

export const inputSchema = z.object({
    message: z.string().min(1, "A mensagem não pode ser vazia.")
})

type InputSchema = z.infer<typeof inputSchema>

export function Input({ onSetMessage }: InputProps) {
    const form = useForm<InputSchema>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            message: ''
        }
    })

    const { mutateAsync: sendChat, isPending } = useChat()

    async function handleSendMessage(data: InputSchema) {
        console.log(data)
        onSetMessage({
            id: crypto.randomUUID(),
            message: data.message,
            sender: 'user',
            timestamp: new Date()
        })

        const idTemp = crypto.randomUUID()

        onSetMessage({
            id: idTemp,
            message: 'Pensando',
            sender: 'bot',
            timestamp: new Date()
        })

        const response = await sendChat(data)

        onSetMessage(undefined, idTemp)

        onSetMessage({
            id: crypto.randomUUID(),
            message: response.message,
            sender: 'bot',
            timestamp: new Date()
        })
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(handleSendMessage)}>
            <div className="flex gap-4 border-t py-4">
                <Textarea
                    placeholder="Digite a sua mensagem..."
                    wrap="soft"
                    disabled={isPending}
                    className="border p-2 rounded-sm 
                            break-all whitespace-pre-wrap overflow-x-hidden w-full h-10 resize-none"
                    {...form.register('message')}
                />
                <Button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-400 h-full w-15 p-6"
                    disabled={isPending}
                >
                    <Send />
                </Button>
            </div >
        </form>
    )
}