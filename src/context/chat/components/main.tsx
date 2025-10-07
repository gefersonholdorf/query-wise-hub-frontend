import { useState } from "react"
import { Input } from "./input"
import { Wrapper } from "./wrapper"
import { Messages } from "./messages"

export interface IChatMessage {
    id: string
    message: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export const Chat = {
    Wrapper: Wrapper,
    Input: Input,
    Messages: Messages
}

export function ChatComponent() {
    const [messages, setMessages] = useState<IChatMessage[]>([])

    function handleSendMessage(message: string) {
        setMessages(prev => [...prev, {
            id: crypto.randomUUID(),
            message,
            sender: 'user',
            timestamp: new Date()
        }])
    }

    return (
        <Chat.Wrapper>
            <div>
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 space-y-2 select-none">
                        <h2 className="text-xl font-semibold text-gray-700">
                            👋 Olá! Sou seu assistente virtual.
                        </h2>
                        <p>Como posso te ajudar hoje?</p>
                    </div>
                ) : (
                    <Messages messages={messages} />
                )}
            </div>
            <Chat.Input onSetMessage={handleSendMessage} />
        </Chat.Wrapper>
    )
}