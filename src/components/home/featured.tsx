import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    name: "Jaquetas",
    id: "jaquetas",
    image: "/featured-jaqueta.png",
    link: "/loja?category=jaquetas",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    name: "Novidades",
    id: "new",
    image: "/featured-novidade.png",
    link: "/loja?sort=newest",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    name: "Moletons",
    id: "moletons",
    image: "/featured-moletom.png",
    link: "/loja?category=moletons",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    name: "Camisetas",
    id: "camisetas",
    image: "/featured-camiseta.webp",
    link: "/loja?category=camisetas",
    className: "md:col-span-1 md:row-span-1"
  }
]

export function Featured() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })

      // Cards Stagger Animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(cards,
          {
            y: 100,
            opacity: 0,
            scale: 0.95
          },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)"
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Hover animations using GSAP context-safe function not strictly necessary for simple hover, 
  // but we can add specialized mouse enter/leave logic if needed. 
  // For now, smooth CSS transitions for hover coupled with GSAP entrance is a great combo.
  // However, let's enhance hover with GSAP-like smoothness classes.

  return (
    <section ref={sectionRef} className="py-24 bg-background border-t border-border overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div ref={headerRef} className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Explore</p>
            <h2 className="font-[var(--font-display)] text-5xl font-black uppercase tracking-tighter text-foreground">Categorias</h2>
          </div>

          <Button variant="link" className="hidden md:flex text-sm font-bold uppercase tracking-widest group">
            Ver Todas
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.link}
              className={`relative group overflow-hidden bg-secondary block h-full ${cat.className} rounded-sm`}
            >
              {/* Image with Parallax-like scale effect on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  <div className="overflow-hidden">
                    <h3 className="font-[var(--font-display)] font-bold text-3xl uppercase tracking-tighter text-white translate-y-0 transition-transform duration-500">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-20 opacity-0 group-hover:opacity-100">
                    <p className="text-white/80 text-sm font-medium mt-2 uppercase tracking-widest flex items-center gap-2">
                      Explorar <ArrowUpRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
