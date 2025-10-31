/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
/** biome-ignore-all lint/a11y/useValidAnchor: <"explanation"> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <"explanation"> */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../http/use-login";
import { useAuth } from "@/context/auth/auth-context";
import { Navigate } from "react-router";
import { LoginRecovery } from "./login-recover";

export const loginSchema = z.object({
    login: z.string().min(3, "O login deve ter no mínimo 3 caracteres."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
})

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState<'LOGIN' | 'RECOVER' | 'REQUESTACCESS'>('LOGIN')

    const { signIn, isAuthenticated } = useAuth()

    const { mutateAsync: login, isPending } = useLogin()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: "",
            password: "",
        }
    })

    async function loginUser(data: LoginFormData) {
        const result = await login(data)

        await localStorage.setItem('token', result.token)

        signIn(result.token)

        form.reset()
    }

    function handleSetType(type: 'LOGIN' | 'RECOVER' | 'REQUESTACCESS') {
        setType(type)
    }

    if (isAuthenticated) {
        return <Navigate to={'/initial-page'} />
    }

    return (
        <Card className="min-w-150 shadow-2xl border border-sky-100 backdrop-blur-xl bg-white/95 rounded-3xl transition-all duration-300 hover:shadow-[10_80px_60px_rgb(56, 191, 248)]">
            <CardContent className="p-8">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <img
                        src="/logo.png"
                        alt="Logo do Sistema"
                        width={90}
                        height={90}
                        className="drop-shadow-md transition-transform duration-300 hover:scale-105"
                    />
                    <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight">
                        QUERY WISE HUB
                    </h2>
                    <p className="text-sm text-gray-500 text-center max-w-[300px]">
                        Acesse sua conta e gerencie seus conhecimentos.
                    </p>
                </div>

                {type === 'LOGIN' && (
                    <form className="space-y-6" onSubmit={form.handleSubmit(loginUser)}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Login (CPF / E-MAIL / USERNAME)
                            </label>
                            <Input
                                {...form.register("login")}
                                placeholder="Informe seu login..."
                                className="border-gray-300 focus-visible:ring-sky-500 focus-visible:ring-2 focus:border-sky-400 transition-all duration-200"
                            />
                            {form.formState.errors.login && (
                                <span className="text-[.9rem] text-red-600">
                                    {form.formState.errors.login.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label className="text-sm font-semibold text-gray-700">Senha</label>
                            <Input
                                {...form.register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Informe sua senha..."
                                className="border-gray-300 focus-visible:ring-sky-500 focus-visible:ring-2 focus:border-sky-400 transition-all duration-200 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-500 hover:text-sky-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {form.formState.errors.password && (
                                <span className="text-[.9rem] text-red-600">
                                    {form.formState.errors.password.message}
                                </span>
                            )}
                        </div>

                        <div className="pt-4">
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold p-6=5 text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-sky-200 cursor-pointer"
                            >
                                {isPending ? (<Loader2 className="animate-spin" size={18} />) : (<LogIn size={18} />)}
                                Entrar
                            </Button>
                        </div>

                        <div className="text-center pt-3 text-sm text-gray-500 flex flex-col gap-4">
                            <a
                                href="#"
                                className="text-sky-600 hover:text-sky-700 font-medium transition-all"
                                onClick={() => handleSetType('RECOVER')}
                            >
                                Esqueceu sua senha?
                            </a>

                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <span>Não tem uma conta?</span>
                                <a
                                    href="#"
                                    className="text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 transition-all"
                                >
                                    <UserPlus size={15} />
                                    Pedir acesso
                                </a>
                            </div>
                        </div>
                    </form>
                )}
                {type === 'RECOVER' && (
                    <LoginRecovery onSetType={handleSetType} />
                )}
            </CardContent>
        </Card>
    );
}
