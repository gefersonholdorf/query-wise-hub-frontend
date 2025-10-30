import { LoginForm } from "./login-form";

const Login = {
    Form: LoginForm
}

export function LoginComponent() {
    return (
        <div className="w-full h-screen bg-[url('/fundo.png')] bg-no-repeat bg-center bg-cover flex items-center justify-center">
            <Login.Form />
        </div>
    )
}