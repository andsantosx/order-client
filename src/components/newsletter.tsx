import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Sparkles } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Fique por dentro</span>
          </div>
          
          <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Junte-se a comunidade
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Receba em primeira mao lancamentos exclusivos, ofertas especiais e inspiracoes de estilo.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold text-white">Inscricao confirmada!</p>
                <p className="text-sm text-white/70">Fique de olho no seu email.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 text-base px-6 rounded-full focus:border-white/40 focus:ring-white/20"
                  required
                />
              </div>
              <Button 
                type="submit"
                size="lg"
                className="h-14 px-8 bg-white text-primary hover:bg-white/90 font-semibold rounded-full"
              >
                Inscrever-se
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          )}

          <p className="mt-6 text-sm text-white/50">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  )
}
