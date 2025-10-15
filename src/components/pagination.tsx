import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface PaginationComponentProps {
    page: number;       // Página atual
    totalPage: number;  // Itens por página
    total: number;      // Total de registros
    component: string;  // Rota do componente
}

function getVisiblePages(current: number, totalPages: number, maxVisible = 5) {
    if (totalPages <= 1) return [1];

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function PaginationComponent({
    page,
    totalPage,
    total,
    component,
}: PaginationComponentProps) {
    const navigate = useNavigate();

    const totalPages = Math.ceil(total / totalPage);

    const pages = getVisiblePages(page, totalPages, 5);

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 border border-gray-200 p-3 rounded-lg bg-white shadow-sm">
            {total / totalPage}
            <span className="text-sm text-gray-600">
                Mostrando{" "}
                <span className="font-semibold">{totalPage}</span> por página, de{" "}
                <span className="font-semibold">{total}</span> resultados
            </span>

            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => navigate(`/${component}?page=${1}`)}
                    aria-label="Primeira página"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    size="icon"
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => navigate(`/${component}?page=${page - 1}`)}
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => navigate(`/${component}?page=${p}`)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${p === page
                            ? "bg-sky-500 text-white shadow-md scale-105"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600"
                            }`}
                    >
                        {p}
                    </button>
                ))}

                <Button
                    size="icon"
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => navigate(`/${component}?page=${page + 1}`)}
                    aria-label="Próxima página"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    size="icon"
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => navigate(`/${component}?page=${totalPages}`)}
                    aria-label="Última página"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
