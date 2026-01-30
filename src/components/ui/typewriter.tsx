import { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

export function Typewriter({ text, speed = 30, delay = 0, className = '', onComplete }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

    useEffect(() => {
        if (!isVisible || hasStarted) return;

        const startTimeout = setTimeout(() => {
            setHasStarted(true);
            let currentIndex = 0;

            const intervalId = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                    onComplete?.();
                }
            }, speed);

            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [isVisible, text, speed, delay, hasStarted, onComplete]);

    return (
        <div ref={ref} className={className}>
            {displayedText}
            <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse" />
        </div>
    );
}

// Hook para usar typewriter com controle manual
export function useTypewriter(text: string, options: { speed?: number; startOnVisible?: boolean } = {}) {
    const { speed = 30, startOnVisible = true } = options;
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (startOnVisible && !isVisible) return;
        if (hasStartedRef.current) return;

        hasStartedRef.current = true;
        setIsTyping(true);
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
                setIsComplete(true);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [isVisible, text, speed, startOnVisible]);

    return { ref, displayedText, isTyping, isComplete };
}
