import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface PaginationComponentProps {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number
    component: string;
    maxVisible?: number;
}

function getVisiblePages(current: number, totalPages: number, maxVisible = 5) {
    const pages: (number | "...")[] = [];

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        const numAdjacent = Math.floor((maxVisible - 3) / 2); // páginas ao redor do current
        let start = Math.max(2, current - numAdjacent);
        let end = Math.min(totalPages - 1, current + numAdjacent);

        // Ajuste quando estamos próximos das extremidades
        if (current - 1 <= numAdjacent) end = maxVisible - 1;
        if (totalPages - current <= numAdjacent) start = totalPages - maxVisible + 2;

        pages.push(1); // primeira página
        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages); // última página
    }

    return pages;
}

export function PaginationComponent({
    page,
    pageSize,
    total,
    totalPages,
    component,
    maxVisible = 5,
}: PaginationComponentProps) {
    const navigate = useNavigate();
    const pages = getVisiblePages(page, totalPages, maxVisible);

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 border border-gray-200 p-3 rounded-lg bg-white shadow-sm">
            <span className="text-sm text-gray-600">
                Mostrando{" "}
                <span className="font-semibold text-gray-800">{pageSize}</span> de {total} resultados
            </span>

            <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" disabled={page <= 1} onClick={() => navigate(`/${component}?page=1`)} aria-label="Primeira página">
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button size="icon" variant="outline" disabled={page <= 1} onClick={() => navigate(`/${component}?page=${page - 1}`)} aria-label="Página anterior">
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pages.map((p, idx) =>
                    p === "..." ? (
                        <span key={idx} className="w-9 h-9 flex items-center justify-center text-gray-500">
                            {p}
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => navigate(`/${component}?page=${p}`)}
                            disabled={p === page}
                            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${p === page
                                ? "bg-sky-500 text-white shadow-md scale-105 cursor-default"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <Button size="icon" variant="outline" disabled={page >= totalPages} onClick={() => navigate(`/${component}?page=${page + 1}`)} aria-label="Próxima página">
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button size="icon" variant="outline" disabled={page >= totalPages} onClick={() => navigate(`/${component}?page=${totalPages}`)} aria-label="Última página">
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
