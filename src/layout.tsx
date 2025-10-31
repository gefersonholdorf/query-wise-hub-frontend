/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <"explanation"> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <"explanation"> */
import { BookOpen, ChevronLeft, Circle, CircleCheck, CircleUserRound, ClipboardList, Cog, Home, LayoutDashboard, LogOut, Menu, MessageSquareMore, Plus, User, Users2 } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NavComponent } from "./components/nav/nav-component";
import { useAuth } from "./context/auth/auth-context";
import { useLogout } from "./context/login/http/use-logout";
import { Button } from "./components/ui/button";

export function Layout() {
    const [open, setOpen] = useState(false);
    const location = useLocation()

    function handleToggleMenu() {
        setOpen(!open);
    }

    return (
        <div className="relative w-full min-h-screen flex bg-gray-100">
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
                    <Link to="/initial-page"><NavComponent active={location.pathname === '/initial-page' ? 'select' : 'default'} title="Página Inicial" icon={<Home size={15} />} /></Link>
                    <Link to="/dashboard"><NavComponent active={location.pathname === '/dashboard' ? 'select' : 'default'} title="Dashboard" icon={<LayoutDashboard size={15} />} /></Link>
                    <Link to="/knowledge?page=1"><NavComponent active={location.pathname.startsWith('/knowledge') ? 'select' : 'default'} title="Base de Conhecimento" icon={<BookOpen size={15} />} /></Link>
                    <Link to="/create-knowledge"><NavComponent active={location.pathname === '/create-knowledge' ? 'select' : 'default'} title="Novo Conhecimento" icon={<Plus size={15} />} /></Link>
                    <Link to="/analysis"><NavComponent active={location.pathname.startsWith('/analysis') ? 'select' : 'default'} title="Análise de Solicitações" icon={<ClipboardList size={15} />} /></Link>
                    <Link to="/chat"><NavComponent active={location.pathname === '/chat' ? 'select' : 'default'} title="Chat Assistente" icon={<MessageSquareMore size={15} />} /></Link>
                </nav>

                <nav className="flex flex-col gap-1 w-full p-2">
                    <span className="text-sm text-gray-600 font-semibold p-2">CONFIGURAÇÕES</span>
                    <Link to="/users"><NavComponent active={location.pathname === '/users' ? 'select' : 'default'} title="Usuários" icon={<Users2 size={15} />} /></Link>
                    <Link to="/settings"><NavComponent active={location.pathname === '/settings' ? 'select' : 'default'} title="Configurações" icon={<Cog size={15} />} /></Link>
                </nav>
                <div></div>
                <Footer />
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
    const { signOut, user } = useAuth()
    const { mutateAsync: logout } = useLogout()

    async function handleLogout() {
        await logout()
        signOut()
    }

    function getRoleLabel(role?: string) {
        switch (role) {
            case "ADMIN":
                return "Administrador"
            case "COMMON":
                return "Comum"
            case "EMPLOYEE":
                return "Funcionário"
            default:
                return "Desconhecido"
        }
    }

    return (
        <div className="flex flex-col border-gray-200 bg-white/60 backdrop-blur-md">

            <div className="px-6 flex gap-2 cursor-pointer hover:text-red-700 p-2" onClick={() => handleLogout()}> <LogOut size={20} className="text-red-500 " /> <span className="text-sm text-red-500">Sair</span> </div>

            <footer className="border-t border-gray-200 text-center text-gray-500 text-[0.75rem] py-4 bg-gray-50/70">
                © {new Date().getFullYear()} Desenvolvido por{" "}
                <br />
                <span className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                    Geferson Holdorf
                </span>
            </footer>
        </div>
    )
}
