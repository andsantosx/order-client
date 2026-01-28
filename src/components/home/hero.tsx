import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image - Absolute fill */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/30" /> {/* Slightly darker overlay for text readability */}
      </div>

      {/* Content */}
      <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col justify-end pb-24">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">
              Season 2024 / Collection 01
            </p>
            <h1 className="font-[var(--font-display)] text-6xl md:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase">
              Urban<br />
              Essence
            </h1>
          </div>

          <p className="max-w-xl text-lg text-white/90 font-medium leading-relaxed">
            Redefining street luxury with minimalist silhouettes and premium materials.
            Designed for the modern individual.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Button
              size="lg"
              className="h-14 px-8 text-base rounded-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest transition-all hover:px-10"
            >
              Shop Collection
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 text-base rounded-full border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest bg-transparent group"
            >
              View Lookbook
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
