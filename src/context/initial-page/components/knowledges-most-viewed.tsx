import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { truncatedText } from "@/helpers/truncate-text";
import { Clock, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router";

const topKnowledges = [
    {
        id: 1,
        title: 'Não consigo acessar o sistemaNão consigo acessar o sistemaNão consigo acessar o sistemaNão consigo acessar o sistema',
        views: 10
    },
    {
        id: 2,
        title: 'Não consigo acessar o sistema',
        views: 10
    },
    {
        id: 3,
        title: 'Não consigo acessar o sistema',
        views: 10
    },
    {
        id: 4,
        title: 'Não consigo acessar o sistema',
        views: 10
    },
    {
        id: 5,
        title: 'Não consigo acessar o sistema',
        views: 10
    },
]

export function KnowledgesMostViewedComponent() {
    const navigate = useNavigate()
    return (
        <Card className="py-0 gap-4 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow">
            <div className="flex items-center justify-between px-4 border-b py-4">
                <div className="flex flex-col gap-2">
                    <CardTitle className="flex items-center justify-between">
                        Top 5 conhecimentos mais vistos
                    </CardTitle>
                </div>
                <Button onClick={() => navigate('/knowledge?page=1')} className="bg-sky-500 hover:bg-sky-400 p-2 cursor-pointer"><Search />Ver Todos</Button>
            </div>
            <div className="">
                {topKnowledges.map((item, index) => {
                    return (
                        <div key={item.id} className="flex w-full items-center justify-between hover:bg-gray-100 p-2 px-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center rounded-full h-8 w-8 border border-gray-200 bg-sky-500">
                                    <span className="text-gray-50 text-sm font-semibold">{index + 1}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-gray-700">{truncatedText({ text: item.title, max: 50 })}</span>
                                    <span className="text-[0.8rem] text-gray-600 flex items-center gap-1"><Clock size={12} />Criado em: 16/10/2025 08:00</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye size={15} className="text-gray-600" />
                                <span className="text-sm text-gray-600">15</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}