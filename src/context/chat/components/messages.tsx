/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { tv } from "tailwind-variants"
import type { IChatMessage } from "./main"
import { Sparkles, User2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface MessagesProps {
    messages: IChatMessage[]
}

const messageVariant = tv({
    base: "p-3 rounded-lg max-w-[70%] break-words",
    variants: {
        sender: {
            user: "bg-sky-400 border border-gray-300 text-gray-50",
            bot: "bg-gray-100 border border-gray-300 text-gray-800"
        }
    }
})

export function Messages({ messages }: MessagesProps) {
    return (
        <div className="flex flex-col gap-4">
            <ScrollArea className="h-[600px] w-full rounded-md p-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex mb-2 space-x-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.sender === 'bot' && (
                            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center">
                                <Sparkles size={20} />
                            </div>
                        )}
                        <div className={messageVariant({ sender: msg.sender })}>
                            {msg.message === "Pensando" ? (
                                <div className="flex items-center gap-2">
                                    <Spinner />
                                    <span>{msg.message}...</span>
                                </div>
                            ) : (
                                msg.message
                            )}
                            <div>
                                <span className={`text-[0.8rem] ${msg.sender === 'user' ? 'text-gray-300' : 'text-gray-500'} `}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                        {msg.sender === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <User2 size={20} />
                            </div>
                        )}
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
}
