import { Link } from "react-router-dom";
import { Input } from "../../components/Input";

export function Login() {
    return (
        <div>
            <header className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
                    Entre na sua conta
                </h1>

                <p className="space-x-2">
                    <span className="text-gray-700 tracking-[-0.5px]">
                        Novo por aqui?
                    </span>

                    <Link
                        to="/register"
                        className="tracking-[-0.5px] font-medium text-teal-900"
                    >
                        Crie uma conta
                    </Link>
                </p>
            </header>

            <form className="w-full mt-[60px] flex flex-col gap-4">
                <Input name="email" type="email" placeholder="E-mail" />
                <Input name="password" type="password" placeholder="Senha" />

                <button type="submit" className="mt-2">
                    Entrar
                </button>
            </form>
        </div>
    );
}
