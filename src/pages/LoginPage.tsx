import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/services/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function LoginPage() {
    const navigate = useNavigate();
    const { login: setAuth } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await login({ email, password });
            setAuth(response.user, response.token);
            toast.success(`Bem-vindo, ${response.user.name}!`);

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Email ou senha inválidos.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center pt-24 pb-16">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-sm border">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Entrar</h1>
                    <p className="text-muted-foreground mt-2">
                        Acesse sua conta para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Senha</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Não tem uma conta? </span>
                    <Link to="/register" className="text-primary hover:underline font-medium">
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </div>
    );
}
