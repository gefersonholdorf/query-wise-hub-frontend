import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Filtering() {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
                placeholder="Buscar por problema"
                className="pl-10 bg-white"
            />
        </div>
    );
}