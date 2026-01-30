import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

const categories = [
  {
    name: "Camisetas",
    id: "camisetas",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1887&auto=format&fit=crop",
    link: "/loja?category=camisetas",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    name: "Novidades",
    id: "new",
    image: "featured-novidade.png",
    link: "/loja?sort=newest",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    name: "Moletons",
    id: "moletons",
    image: "featured-moletom.png",
    link: "/loja?category=moletons",
    className: "md:col-span-1 md:row-span-1"
  }
]

export function Featured() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <AnimateOnScroll animation="fade-up" delay={0}>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Explore</p>
              <h2 className="font-[var(--font-display)] text-5xl font-black uppercase tracking-tighter text-foreground">Categorias</h2>
            </div>

            <Button variant="link" className="hidden md:flex text-sm font-bold uppercase tracking-widest group">
              Ver Todas
              <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {categories.map((cat, index) => (
            <AnimateOnScroll key={cat.id} animation="scale" delay={index * 100}>
              <a
                href={cat.link}
                className={`relative group overflow-hidden bg-secondary block h-full ${cat.className}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="bg-background/90 backdrop-blur-sm self-start px-6 py-4 transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-[var(--font-display)] font-bold text-lg uppercase tracking-wider text-foreground">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
