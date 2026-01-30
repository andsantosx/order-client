import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

export function PromoBanner() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Header */}
        <div className="text-center">
          <AnimateOnScroll animation="fade-in" delay={0}>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/50 mb-4">
              FAÇA PARTE DO MOVIMENTO
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              Vista sua<br />
              <span className="text-background/70">autenticidade</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="max-w-xl mx-auto text-background/60 text-lg">
              Cada peça ORDER é pensada para quem não segue, mas define tendências.
              Para aqueles que entendem que estilo é sobre ser, não parecer.
            </p>
          </AnimateOnScroll>
        </div>

      </div>
    </section>
  )
}
