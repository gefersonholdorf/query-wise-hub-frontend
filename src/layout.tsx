import { BookOpen, ChevronLeft, CircleCheckBig, CircleX, ClipboardList, Cog, LayoutDashboard, Menu, Plus, Users2 } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NavComponent } from "./components/nav/nav-component";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/tooltip";

export function Layout() {
    const [open, setOpen] = useState(false);
    const location = useLocation()

    function handleToggleMenu() {
        setOpen(!open);
    }

    return (
        <div className="relative w-full min-h-screen flex bg-[url('/fundo.png')] bg-center bg-cover bg-no-repeat">
            <aside
                className={`
                    fixed top-0 left-0 z-40
                    h-screen w-64 bg-white/70 shadow-2xs border-r
                    flex flex-col justify-between
                    transition-transform duration-300 ease-in-out
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:sticky lg:top-0 shadow-[0_0_10px_5px_rgba(0,0,0,0.08)]
                `}
            >
                <div className="flex flex-col justify-between items-center mb-6 p-3">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <img src={'/logo.png'} alt="Logo" width={50} />
                            <h2 className="text-blue-950 text-xl font-bold">QueryWiseHub</h2>
                        </div>
                        <ChevronLeft
                            size={28}
                            className="cursor-pointer text-gray-950 lg:hidden"
                            onClick={handleToggleMenu}
                        />
                    </div>
                    <div className="mt-3">
                        <span className="text-sm font-semibold text-gray-600">Centralize. Aprenda. Evolua.</span>
                    </div>
                </div>

                <nav className="flex flex-col gap-1 w-full p-2">
                    <span className="text-sm text-gray-600 font-semibold p-2">MÓDULOS PRINCIPAIS</span>
                    <Link to="/home"><NavComponent active={location.pathname === '/home' ? 'select' : 'default'} title="Página Inicial" icon={<LayoutDashboard size={15} />} /></Link>
                    <Link to="/knowledge"><NavComponent active={location.pathname.startsWith('/knowledge') ? 'select' : 'default'} title="Base de Conhecimento" icon={<BookOpen size={15} />} /></Link>
                    <Link to="/create-knowledge"><NavComponent active={location.pathname === '/create-knowledge' ? 'select' : 'default'} title="Novo Conhecimento" icon={<Plus size={15} />} /></Link>
                    <Link to="/request-analysis"><NavComponent active={location.pathname === '/request-analysis' ? 'select' : 'default'} title="Análise de Solicitações" icon={<ClipboardList size={15} />} /></Link>
                </nav>

                <nav className="flex flex-col gap-1 w-full p-2">
                    <span className="text-sm text-gray-600 font-semibold p-2">CONFIGURAÇÕES</span>
                    <Link to="/users"><NavComponent active={location.pathname === '/users' ? 'select' : 'default'} title="Usuários" icon={<Users2 size={15} />} /></Link>
                    <Link to="/settings"><NavComponent active={location.pathname === '/settings' ? 'select' : 'default'} title="Configurações" icon={<Cog size={15} />} /></Link>
                </nav>

                <nav className="flex flex-col gap-1 w-full p-2">
                    <span className="text-sm text-gray-600 font-semibold p-2">STATUS DOS SERVIÇOS</span>
                    <div className="pl-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleCheckBig className="text-emerald-600" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Adicionar novo problema.</p>
                                </TooltipContent>
                            </Tooltip>
                            <span>API</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleCheckBig className="text-emerald-600" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Adicionar novo problema.</p>
                                </TooltipContent>
                            </Tooltip>
                            <span>MYSQl</span>
                        </div>
                        <div className="flex pr-8 items-center gap-1 text-sm text-gray-600">
                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleX className="text-red-600" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Adicionar novo problema.</p>
                                </TooltipContent>
                            </Tooltip>
                            <span>QDRANT</span>
                        </div>
                    </div>
                </nav>
                <div>
                </div>
            </aside>

            {!open && (
                <div className="absolute top-6 left-4 z-30 lg:hidden">
                    <Menu size={32} className="text-blue-950 cursor-pointer" onClick={handleToggleMenu} />
                </div>
            )}

            <main className="min-h-screen flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="w-full py-4 border-t border-gray-200 text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} Desenvolvido por Geferson Holdorf
        </footer>
    );
}
