import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownRight, Play } from "lucide-react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse"
        style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
      />
      <div 
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-accent/15 blur-[150px] animate-pulse"
        style={{ 
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
          animationDelay: '1s'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground/70">Nova Colecao 2026</span>
            </div>
            
            <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[0.9]">
              <span className="block">Eleve</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Seu Estilo
              </span>
            </h1>
            
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
              Descubra pecas exclusivas que redefinem o conceito de moda contemporanea. 
              Design inovador para quem ousa ser diferente.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-sm font-semibold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group"
              >
                Explorar Colecao
                <ArrowDownRight className="ml-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-sm font-semibold tracking-wide border-border text-foreground hover:bg-secondary/50 rounded-full bg-transparent group"
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Ver Lookbook
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 pt-8 border-t border-border">
              <div>
                <p className="font-[var(--font-display)] text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Clientes felizes</p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-3xl font-bold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Pecas exclusivas</p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-3xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Avaliacao media</p>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop')`,
                  transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px) scale(1.1)`,
                  transition: 'transform 0.3s ease-out'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />
              
              {/* Floating card */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-secondary/80 backdrop-blur-xl border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Destaque da semana</p>
                    <p className="font-[var(--font-display)] text-xl font-semibold text-foreground">Urban Collection</p>
                  </div>
                  <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Ver mais
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-primary/30" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-accent/20" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}
