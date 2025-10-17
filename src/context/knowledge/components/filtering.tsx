/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function Filtering() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);
    const navigate = useNavigate();
    const location = useLocation(); // pega a URL atual

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (debouncedSearch) {
            params.set("problem", debouncedSearch);
            params.set("page", "1"); // resetar para página 1 apenas ao digitar
        } else {
            params.delete("problem");
        }

        navigate(`/knowledge?${params.toString()}`);
    }, [debouncedSearch, navigate, location.search]); // agora o linter não reclama

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
                placeholder="Buscar por conhecimento ou solução..."
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-white shadow-sm focus-visible:ring-0 focus:outline-sky-500
                            focus:shadow-none border-2 focus:border-sky-500 text-gray-600 rounded-2xl"
            />
        </div>
    );
}