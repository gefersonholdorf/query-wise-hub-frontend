import { Cpu, RotateCw } from "lucide-react";
import { Button } from "./ui/button";

export function ErrorLoading() {

    return (
        <div className="flex flex-col gap-6 items-center justify-center border-1 bg-white h-full rounded-lg shadow p-6">
            <Cpu size={90} className="text-red-500" />
            <h2 className="text-gray-800 font-semibold text-2xl">Erro 500: Dados em fuga 🚀</h2>
            <p className="text-gray-600 text-sm text-center">
                O sistema encontrou instabilidade dimensional nos servidores. Reinicie a missão para tentar novamente.
            </p>
            <Button
                variant="destructive"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
            >
                <RotateCw className="animate-spin h-4 w-4" />
                Tentar Novamente
            </Button>
        </div>
    );
}