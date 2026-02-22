import { useEffect, useState } from 'react';
import { Typewriter } from '@/components/ui/typewriter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Animação da linha que se expande
function AnimatedLine() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

    return (
        <div ref={ref} className="overflow-hidden">
            <span
                className={`block h-[2px] bg-primary transition-all duration-1000 ease-out ${isVisible ? 'w-12' : 'w-0'
                    }`}
            />
        </div>
    );
}

// Animação do texto que aparece letra por letra com reveal
function AnimatedTitle() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
    const [showThe, setShowThe] = useState(false);
    const [showEssentials, setShowEssentials] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => setShowThe(true), 300);
            setTimeout(() => setShowEssentials(true), 600);
        }
    }, [isVisible]);

    return (
        <div ref={ref}>
            <h2 className="font-[var(--font-display)] text-3xl font-bold uppercase tracking-tight">
                <span className="block overflow-hidden">
                    <span
                        className={`block transition-all duration-700 ease-out ${showThe ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            }`}
                    >
                        The
                    </span>
                </span>
                <span className="block overflow-hidden">
                    <span
                        className={`block transition-all duration-700 ease-out ${showEssentials ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            }`}
                    >
                        Essentials
                    </span>
                </span>
            </h2>
        </div>
    );
}



export function BrandNarrative() {
    const narrativeText = "Simples. Autêntico. Atemporal.";

    return (
        <section className="py-24 lg:py-32 bg-background">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">

                    {/* Lado esquerdo com animações sincronizadas */}
                    <div className="space-y-6">
                        <AnimatedLine />
                        <AnimatedTitle />
                    </div>

                    {/* Lado direito com Typewriter */}
                    <div className="space-y-8">
                        <Typewriter
                            text={narrativeText}
                            speed={80}
                            delay={600}
                            className="text-2xl md:text-4xl font-light leading-tight text-foreground/90 font-serif italic"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}
