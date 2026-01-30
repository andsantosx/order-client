import { useState, useEffect } from "react"

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Verificar se o usuário já aceitou os cookies
        const cookiesAccepted = localStorage.getItem("cookies-accepted")
        if (!cookiesAccepted) {
            // Mostrar banner após um pequeno delay
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem("cookies-accepted", "true")
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                    <p className="text-xs text-foreground/70">
                        Ao navegar por este site <span className="font-semibold text-foreground">você aceita o uso de cookies</span> para agilizar a sua experiência de compra.
                    </p>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 text-xs font-medium tracking-wider border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors uppercase"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    )
}
