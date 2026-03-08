import { useState, useEffect } from "react"
import { Shield, ChevronRight } from "lucide-react"

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [showPreferences, setShowPreferences] = useState(false)

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookies-preferences")
        if (!cookiesAccepted) {
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const savePreferences = (type: 'all' | 'essential') => {
        localStorage.setItem("cookies-preferences", type)
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-5 pointer-events-none flex items-end justify-center sm:justify-start">
            {/* Soft Overlay when preferences are open */}
            {showPreferences && (
                <div
                    className="fixed inset-0 bg-background/60 backdrop-blur-[2px] pointer-events-auto transition-opacity"
                    onClick={() => setShowPreferences(false)}
                />
            )}

            <div className={`
                relative w-full max-w-sm bg-background/95 backdrop-blur-md border border-border/50 shadow-2xl pointer-events-auto flex flex-col transition-all duration-300 ease-out origin-bottom
                ${showPreferences ? 'max-w-md' : ''}
            `}>

                {!showPreferences ? (
                    // Default Compact View
                    <div className="p-5 flex flex-col gap-4">
                        <div className="space-y-2">
                            <h3 className="text-xs font-semibold text-foreground tracking-widest uppercase flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5" /> Privacidade
                            </h3>
                            <p className="text-[11px] text-foreground/70 leading-relaxed font-medium">
                                Operamos com cookies para oferecer a melhor experiência. Ao continuar, você concorda com nossos{" "}
                                <a href="/termos" className="font-semibold text-foreground underline underline-offset-2 hover:text-primary transition-colors">Termos</a>{" e "}
                                <a href="/politica" className="font-semibold text-foreground underline underline-offset-2 hover:text-primary transition-colors">Políticas</a>.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 pt-1">
                            <button
                                onClick={() => savePreferences('all')}
                                className="w-full px-4 py-2 text-[10px] font-bold tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-colors uppercase"
                            >
                                Aceitar Todos
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => savePreferences('essential')}
                                    className="flex-1 px-4 py-2 text-[10px] font-bold tracking-widest border border-border/50 text-foreground hover:bg-secondary/50 transition-colors uppercase"
                                >
                                    Essenciais
                                </button>
                                <button
                                    onClick={() => setShowPreferences(true)}
                                    className="flex-1 px-4 py-2 text-[10px] font-semibold text-foreground/60 hover:text-foreground tracking-widest uppercase transition-colors"
                                >
                                    Gerenciar
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Expanded Preferences View
                    <div className="p-5 md:p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className="space-y-1.5 border-b border-border/50 pb-3">
                            <h3 className="text-xs font-semibold text-foreground tracking-widest uppercase">Preferências</h3>
                            <p className="text-[11px] text-foreground/60 leading-relaxed">
                                Refine seu nível de rastreamento de acordo com nossos Termos.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Essential (Locked) */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 shrink-0">
                                    <input type="checkbox" checked disabled className="w-3.5 h-3.5 accent-foreground cursor-not-allowed opacity-50" />
                                </div>
                                <div className="space-y-0.5 block">
                                    <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider">Estritamente Necessários</h4>
                                    <p className="text-[10px] text-foreground/60 leading-relaxed">
                                        Fundamentais para funcionamento (segurança, carrinho). Inacessíveis à desativação.
                                    </p>
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 shrink-0">
                                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-foreground cursor-pointer" id="m-analytics" />
                                </div>
                                <label htmlFor="m-analytics" className="cursor-pointer select-none space-y-0.5 block">
                                    <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider">Desempenho (Analytics)</h4>
                                    <p className="text-[10px] text-foreground/60 leading-relaxed">
                                        Métricas anônimas sobre visitas e fontes de tráfego que moldam melhorias na loja.
                                    </p>
                                </label>
                            </div>

                            {/* Marketing */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 relative flex items-center justify-center w-4 h-4 shrink-0">
                                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-foreground cursor-pointer" id="m-marketing" />
                                </div>
                                <label htmlFor="m-marketing" className="cursor-pointer select-none space-y-0.5 block">
                                    <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider">Marketing & Ads</h4>
                                    <p className="text-[10px] text-foreground/60 leading-relaxed">
                                        Rastreadores focados em exibir campanhas relacionadas às suas buscas.
                                    </p>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
                            <button
                                onClick={() => savePreferences('all')}
                                className="w-full px-4 py-2 text-[10px] font-bold tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-colors uppercase"
                            >
                                Salvar Preferências
                            </button>
                            <button
                                onClick={() => setShowPreferences(false)}
                                className="w-full text-[10px] font-semibold text-foreground/60 hover:text-foreground tracking-wider uppercase transition-colors py-1.5 flex items-center justify-center gap-1 group"
                            >
                                <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                Voltar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
