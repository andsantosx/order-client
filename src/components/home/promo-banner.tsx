import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Truck, RotateCcw, Shield } from "lucide-react"

const features = [
  { icon: Zap, label: "Entrega Express", value: "24h" },
  { icon: Truck, label: "Frete Gratis", value: "+R$299" },
  { icon: RotateCcw, label: "Devolucao", value: "30 dias" },
  { icon: Shield, label: "Garantia", value: "1 ano" },
]

export function PromoBanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("promo-section")?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="promo-section" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      
      {/* Moving orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px]"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px]"
        style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-primary tracking-wide mb-4">Por que nos escolher</p>
          <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Experiencia
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Incomparavel
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Mais do que uma loja, somos um destino para quem busca estilo, qualidade e inovacao.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.label}
              className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="font-[var(--font-display)] text-3xl font-bold text-foreground mb-2">{feature.value}</p>
                <p className="text-muted-foreground">{feature.label}</p>
              </div>
              
              {/* Decorative number */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-foreground/5 font-[var(--font-display)]">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          >
            Comecar a comprar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-14 px-10 rounded-full border-border hover:bg-secondary bg-transparent"
          >
            Falar com atendimento
          </Button>
        </div>
      </div>
    </section>
  )
}
