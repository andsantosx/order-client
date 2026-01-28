import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react"

const features = [
  {
    id: "01",
    icon: Truck,
    label: "Express Delivery",
    value: "24H",
    desc: "Receive your order within 24 hours in major cities."
  },
  {
    id: "02",
    icon: Star,
    label: "Premium Quality",
    value: "100%",
    desc: "Verified authentic materials and craftsmanship."
  },
  {
    id: "03",
    icon: RefreshCw,
    label: "Easy Returns",
    value: "30D",
    desc: "Hassle-free returns within 30 days of purchase."
  },
  {
    id: "04",
    icon: ShieldCheck,
    label: "Secure Warranty",
    value: "1YR",
    desc: "Comprehensive coverage for all manufacturing defects."
  },
]

export function PromoBanner() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Why Choose Us</p>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Unparalleled<br />Experience
            </h2>
          </div>
          <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
            More than just a store. A destination for those who seek style, quality, and innovation in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-border">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`
                group relative p-8 border-b border-border 
                ${index % 2 === 0 ? 'md:border-r' : ''} 
                lg:border-r lg:last:border-r-0
              `}
            >
              <div className="mb-6 flex justify-between items-start">
                <span className="font-mono text-sm text-muted-foreground">({feature.id})</span>
                <feature.icon className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>

              <div className="space-y-4">
                <h3 className="font-[var(--font-display)] text-6xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors">
                  {feature.value}
                </h3>
                <div>
                  <p className="font-bold text-lg uppercase tracking-wide mb-1">{feature.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Button
            size="lg"
            className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-widest"
          >
            Start Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

      </div>
    </section>
  )
}
