/** biome-ignore-all lint/a11y/noLabelWithoutControl: <"explanation"> */
/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Info, Mail } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface LoginRecoveryProps {
    onSetType: (type: 'LOGIN' | 'RECOVER' | 'REQUESTACCESS') => void
}

export function LoginRecovery({ onSetType }: LoginRecoveryProps) {
    return (
        <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">

                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info size={20} className="text-sky-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Informe seu e-mail e iremos enviar um link para estar efetuando a troca da senha.</p>
                        </TooltipContent>
                    </Tooltip>
                    Recuperar Senha
                </label>
                <Input
                    placeholder="Informe seu e-mail..."
                    className="border-gray-300 focus-visible:ring-sky-500 focus-visible:ring-2 focus:border-sky-400 transition-all duration-200"
                />
            </div>
            <div className="w-full flex justify-between items-center gap-2">
                <Button variant="link" className="cursor-pointer" onClick={() => onSetType('LOGIN')}><ArrowLeft />Voltar para o Login</Button>
                <Button className="bg-sky-500 hover:bg-sky-600"><Mail />Recuperar Senha</Button>
            </div>
        </form>
    )
}