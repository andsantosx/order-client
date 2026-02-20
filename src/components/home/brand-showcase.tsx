"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    title: "Atemporal",
    subtitle: "A ESSÊNCIA DO DESIGN",
    description: "Peças que transcendem tendências, focadas na longevidade e no estilo que nunca envelhece.",
    image: "/image1.jpg",
    tag: "Minimalismo"
  },
  {
    title: "Atitude",
    subtitle: "EXPRESSÃO URBANA",
    description: "O streetwear como forma de arte. Identidade moldada pelas ruas e pela cultura contemporânea.",
    image: "/image2.jpg",
    tag: "Cultura"
  },
  {
    title: "Qualidade",
    subtitle: "TEXTURAS E MATERIAIS",
    description: "Cada fio, cada costura. Selecionamos os materiais mais premium para garantir conforto e durabilidade.",
    image: "/image3.jpg",
    tag: "Premium"
  },
  {
    title: "Order",
    subtitle: "NOSSO MANIFESTO",
    description: "Não fazemos apenas roupas. Criamos uniformes para quem busca ordem no caos urbano.",
    image: "/image4.jpg",
    tag: "Manifesto"
  }
]

export function BrandShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const totalWidth = wrapper.scrollWidth
      const windowWidth = window.innerWidth
      // Ensure we scroll exactly the distance needed to show the last card fully
      const scrollDistance = totalWidth - windowWidth

      const horizontalAnimation = gsap.to(wrapper, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          // Animate progress bar
          onUpdate: (self) => {
            gsap.to("#progress-bar", {
              scaleX: self.progress,
              duration: 0.1,
              ease: "none"
            })
          }
        },
      })

      // Items Entrance and Color Reveal (Mobile/Scroll)
      const cardItems = wrapper.querySelectorAll(".showcase-card")
      cardItems.forEach((item) => {
        const image = item.querySelector("img")
        const content = item.querySelector(".showcase-content")
        
        // Base Entrance
        gsap.from(item, {
          scale: 0.8,
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: item,
            containerAnimation: horizontalAnimation,
            start: "left right",
            toggleActions: "play none none reverse",
          }
        })

        // Color Reveal ScrollTrigger
        if (image && content) {
          // Use a wider trigger zone for smoother mobile transition
          gsap.to(image, {
            filter: "grayscale(0%)",
            scale: 1.05,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: horizontalAnimation,
              start: "left center+=25%", 
              end: "right center-=25%",
              toggleActions: "play reverse play reverse",
            }
          })

          gsap.to(content, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: horizontalAnimation,
              start: "left center+=25%", 
              end: "right center-=25%",
              toggleActions: "play reverse play reverse",
            }
          })
        }

        // Desktop Hover Highlight
        item.addEventListener("mouseenter", () => {
          gsap.to(image, { filter: "grayscale(0%)", scale: 1.08, duration: 0.4 })
          gsap.to(content, { y: 0, opacity: 1, duration: 0.4 })
        })
        item.addEventListener("mouseleave", () => {
          // Hover reversal is handled by ScrollTrigger automatically on next update
          // but we can add a simple ease back if desired.
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-background border-t border-border"
      id="brand-experience"
    >
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-[18vw] font-black text-foreground/[0.02] leading-none pointer-events-none select-none uppercase italic">
        Experience
      </div>

      <div className="flex h-screen items-center">
        {/* Horizontal Container */}
        <div 
          ref={wrapperRef} 
          className="flex flex-nowrap items-center px-[10vw] gap-20"
        >
          {/* Intro Card */}
          <div className="flex-shrink-0 w-[400px] md:w-[600px] space-y-8">
            <span className="text-primary text-xs font-black uppercase tracking-[0.5em] block animate-pulse">
              Scroll to explore
            </span>
            <h2 className="text-6xl md:text-8xl font-medium text-foreground uppercase tracking-tighter italic leading-[0.9] font-serif">
              BRAND <br /> <span className="text-muted-foreground/20 italic">VOYAGE</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-md">
              Mergulhe na visão da ORDER. Uma jornada através do design, cultura e qualidade superior.
            </p>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center animate-bounce">
                <ArrowRight className="text-foreground w-4 h-4" />
              </div>
              <span className="text-muted-foreground/30 text-xs font-bold uppercase tracking-widest">Desvende a essência</span>
            </div>
          </div>

          {/* Interactive Cards */}
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="showcase-card flex-shrink-0 w-[300px] md:w-[450px] group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/30 border border-border">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                />
                {/* Overlay - Strengthened for better legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
                
                {/* Tag */}
                <div className="absolute top-6 left-6 px-4 py-1 rounded-full bg-background/20 backdrop-blur-md border border-white/10">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">{item.tag}</span>
                </div>

                {/* Content */}
                <div className="showcase-content absolute inset-0 p-10 flex flex-col justify-end translate-y-6 opacity-0">
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3 block drop-shadow-sm">
                    {item.subtitle}
                  </span>
                  <h3 className="text-foreground text-4xl md:text-5xl font-medium uppercase tracking-tighter italic leading-none mb-4 font-serif drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-foreground/80 text-sm font-medium leading-relaxed line-clamp-3 drop-shadow-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Numbering */}
              <div className="absolute -top-10 -right-4 text-7xl font-black text-foreground/[0.03] italic pointer-events-none group-hover:text-foreground/10 transition-colors">
                0{idx + 1}
              </div>
            </div>
          ))}

          {/* Outro Card */}
          <div className="flex-shrink-0 w-[600px] md:w-[1000px] flex flex-col justify-center items-center text-center space-y-12 px-[10vw] relative">
            {/* Artistic Decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none -z-10">
                <span className="text-[300px] font-serif italic">O</span>
            </div>

            <div className="space-y-4">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.6em] block">Fine Detail</span>
              <h2 className="text-7xl md:text-9xl font-light text-foreground uppercase tracking-tight font-serif italic leading-none">
                Simply <br /> <span className="translate-x-12 block">Elegance.</span>
              </h2>
            </div>
            
            <div className="max-w-sm mx-auto h-[1px] bg-gradient-to-r from-transparent via-border to-transparent w-full" />
            
            <p className="text-muted-foreground/40 text-[10px] font-medium tracking-[0.4em] uppercase">
              Order Payload &copy; 2026 — The Art of Essentialism
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar (at the bottom) */}
      <div className="absolute bottom-10 left-0 w-full px-[10vw]">
        <div className="h-[2px] w-full bg-border overflow-hidden rounded-full">
          <div 
            id="progress-bar" 
            className="h-full bg-primary origin-left scale-x-0"
          />
        </div>
      </div>
    </section>
  )
}
