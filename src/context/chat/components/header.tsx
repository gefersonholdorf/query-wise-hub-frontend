import { Button } from "@/components/ui/button";

interface HeaderProps {
    onCleanChat?: () => void
}

export function Header({ onCleanChat }: HeaderProps) {
    return (
        <div className="flex items-center justify-between border-b pb-4">
            <div>

            </div>
            <div>
                <Button variant="outline" onClick={() => onCleanChat?.()}>Limpar chat</Button>
            </div>
        </div>
    )
}