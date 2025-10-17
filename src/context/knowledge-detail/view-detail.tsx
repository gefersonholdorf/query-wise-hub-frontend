import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCheck } from "lucide-react";

export function ViewDetail() {
    return (
        <div className="grid grid-cols-2 gap-4 border p-2 rounded-lg border-gray-200">
            <div>
                <div>
                    <span className="text-gray-700 font-semibold">Problemas</span>
                </div>
                <ScrollArea className="w-full h-60 pr-4">
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b p-2">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b">
                        <span className="text-sm font-medium text-gray-600">Informações se perdem ou ficam espalhadas</span>
                    </div>
                </ScrollArea>
            </div>
            <div>
                <div>
                    <div>
                        <span className="text-gray-700 font-semibold flex items-center gap-1"><FileCheck size={18} className="text-gray-700" />Solução</span>
                    </div>
                    <div className="p-2 border border-gray-200 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Essa solução é grande, robusta, escalável e aplicável a qualquer setor: tecnologia, suporte, indústria, RH, saúde, financeiro, jurídico ou consultorias. É o tipo de sistema com potencial de virar produto SaaS ou até uma startup, porque resolve dores reais de forma integrada, inteligente e moderna.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}