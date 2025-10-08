import { useState } from "react"
import { Input } from "./input"
import { Wrapper } from "./wrapper"
import { Messages } from "./messages"
import { Header } from "./header"

export interface IChatMessage {
    id: string
    message: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export const Chat = {
    Wrapper: Wrapper,
    Input: Input,
    Messages: Messages,
    Header: Header
}

export function ChatComponent() {
    const [messages, setMessages] = useState<IChatMessage[]>([])

    function handleSendMessage(message?: IChatMessage, id?: string) {
        if (message) {
            setMessages(prev => [...prev, message])
            return
        }
        if (id) {
            setMessages(prev => prev.filter(m => m.id !== id))
            return
        }
    }

    function handleCleanChat() {
        setMessages([])
    }

    return (
        <Chat.Wrapper>
            {messages.length > 0 && (<Chat.Header onCleanChat={handleCleanChat} />)}
            <div>
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center select-none">
                        <div className="max-w-xl space-y-8 px-6 animate-fade-in">
                            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                                👋 Bem-vindo ao{" "}
                                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent font-bold">
                                    QueryWiseHub Chat
                                </span>
                            </h1>

                            <p className="text-gray-500 text-lg leading-relaxed">
                                Um assistente virtual inteligente projetado para simplificar fluxos,
                                automatizar análises e otimizar sua operação.
                            </p>

                            <div className="w-24 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto"></div>
                        </div>
                    </div>
                ) : (
                    <Messages messages={messages} />
                )}
            </div>
            <Chat.Input onSetMessage={handleSendMessage} messages={messages} />
        </Chat.Wrapper>
    )
}