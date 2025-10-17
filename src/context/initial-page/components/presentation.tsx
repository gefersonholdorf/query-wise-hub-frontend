import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import { Plus, Search } from "lucide-react";

export function PresentationComponent() {
    return (
        <Card className="relative w-full overflow-hidden rounded-xl h-30 flex items-center transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow">
            <img
                src="/fundo.png"
                alt="Fundo"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/50 flex" />
            <div className="w-full relative z-10 flex flex-1 items-center justify-between px-4">
                <div className="text-black">
                    <h1 className="text-2xl font-bold">Bem vindo de volta, Geferson!</h1>
                    <p className="text-sm text-black/70 mt-1">
                        Explore novas ideias e registre aprendizados valiosos hoje.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600"><Search />Buscar Conhecimentos</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600"><Plus />Novo Conhecimento</Button>
                </div>
            </div>
        </Card>
    );
}
