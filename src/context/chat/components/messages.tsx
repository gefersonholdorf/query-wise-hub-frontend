import type { IChatMessage } from "./main"

export interface MessagesProps {
    messages: IChatMessage[]
}

export function Messages({ messages }: MessagesProps) {
    return (
        <div>
            {messages.map((msg) => {
                return <div key={msg.id}>
                    {msg.message}
                </div>
            })}
        </div>
    )
}