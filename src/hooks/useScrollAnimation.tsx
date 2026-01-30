import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
}

// Componente wrapper para animações
interface AnimateOnScrollProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale';
    delay?: number;
    duration?: number;
}

export function AnimateOnScroll({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
    duration = 600
}: AnimateOnScrollProps) {
    const { ref, isVisible } = useScrollAnimation();

    const animations = {
        'fade-up': {
            hidden: 'opacity-0 translate-y-8',
            visible: 'opacity-100 translate-y-0'
        },
        'fade-in': {
            hidden: 'opacity-0',
            visible: 'opacity-100'
        },
        'fade-left': {
            hidden: 'opacity-0 translate-x-8',
            visible: 'opacity-100 translate-x-0'
        },
        'fade-right': {
            hidden: 'opacity-0 -translate-x-8',
            visible: 'opacity-100 translate-x-0'
        },
        'scale': {
            hidden: 'opacity-0 scale-95',
            visible: 'opacity-100 scale-100'
        }
    };

    const anim = animations[animation];

    return (
        <div
            ref={ref}
            className={`transition-all ${className} ${isVisible ? anim.visible : anim.hidden}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            {children}
        </div>
    );
}
