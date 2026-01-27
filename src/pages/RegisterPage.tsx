import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { register } from "@/services/auth/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function RegisterPage() {
    const navigate = useNavigate();
    const { login: setAuth } = useAuthStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Register returns the same structure as Login (token + user)
            const response = await register({ name, email, password });
            setAuth(response.user, response.token);
            toast.success("Conta criada com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Erro ao criar conta. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center pt-24 pb-16">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-sm border">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Criar Conta</h1>
                    <p className="text-muted-foreground mt-2">
                        Preencha os dados abaixo para se cadastrar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nome</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu Nome"
                            required
                        />
                    </div>
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
                            minLength={6}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Criando conta..." : "Cadastrar"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Já tem uma conta? </span>
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}
