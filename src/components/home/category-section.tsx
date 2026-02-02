import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

const categories = [
    {
        name: "Camisetas",
        image: "/camiseta.png",
        href: "/loja?category=camisetas"
    },
    {
        name: "Calças",
        image: "/calca.png",
        href: "/loja?category=calcas"
    },
    {
        name: "Shorts",
        image: "/short.png",
        href: "/loja?category=shorts"
    },
    {
        name: "Moletons",
        image: "/moletom.png",
        href: "/loja?category=moletons"
    },
    {
        name: "Jaquetas",
        image: "/jaqueta.png",
        href: "/loja?category=jaquetas"
    },
    {
        name: "Bonés",
        image: "/bone.png",
        href: "/loja?category=bones"
    },
];

export function CategorySection() {
    return (
        <section className="py-12 bg-background">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="flex justify-center items-center gap-8 lg:gap-16 flex-wrap">
                    {categories.map((category, index) => (
                        <AnimateOnScroll
                            key={category.name}
                            animation="fade-up"
                            delay={index * 100}
                        >
                            <a
                                href={category.href}
                                className="group flex flex-col items-center gap-3"
                            >
                                {/* Imagem circular */}
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-transparent group-hover:border-foreground/20 transition-all duration-300 overflow-hidden bg-secondary/30 flex items-center justify-center">
                                    {category.image ? (
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-secondary flex items-center justify-center text-foreground/40 text-xs uppercase">
                                            IMG
                                        </div>
                                    )}
                                </div>

                                {/* Nome da categoria */}
                                <span className="text-[11px] lg:text-xs font-medium tracking-wide text-foreground/70 group-hover:text-foreground transition-colors uppercase">
                                    {category.name}
                                </span>
                            </a>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
