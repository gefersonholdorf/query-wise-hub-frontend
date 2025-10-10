import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Filtering() {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
                placeholder="Buscar por problema ou solução..."
                className="pl-10 h-12 bg-gray-50 shadow-sm focus-visible:ring-0 focus:outline-sky-500
                            focus:shadow-none border-2 focus:border-sky-500 text-gray-600 rounded-2xl"
            />
        </div>
    );
}