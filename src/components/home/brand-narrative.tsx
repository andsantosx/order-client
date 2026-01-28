
export function BrandNarrative() {
    return (
        <section className="py-24 lg:py-32 bg-background border-t border-border">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">

                    <div className="space-y-6">
                        <span className="inline-block w-12 h-[2px] bg-primary mb-4" />
                        <h2 className="font-[var(--font-display)] text-3xl font-bold uppercase tracking-tight">
                            The<br />
                            Essentials
                        </h2>
                        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                            Est. 2024 — Criciúma, SC
                        </p>
                    </div>

                    <div className="space-y-8">
                        <p className="text-2xl md:text-4xl font-light leading-tight text-foreground/90">
                            We believe in the power of <span className="italic font-serif">simplicity</span>.
                            Our collection is curated for those who seek timeless design over temporary trends.
                            Every piece tells a story of craftsmanship, quality, and modern utility.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Design</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Clean lines, neutral palettes, and functional details that adapt to your lifestyle.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Quality</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Premium fabrics sourced responsibly and constructed to last beyond the season.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
