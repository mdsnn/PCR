import { useEffect, useState } from 'react';

type SplashScreenProps = {
    onComplete?: () => void;
    fadeDelay?: number;
    duration?: number;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, fadeDelay = 2500, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, fadeDelay);

        const completeTimer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) {
                onComplete();
            }
        }, duration);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete, fadeDelay, duration]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
                fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center">
                <div className="animate-pulse">
                    <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" className="animate-fadeInUp">
                        <text
                            x="200"
                            y="60"
                            fontFamily="Arial, Helvetica, sans-serif"
                            fontSize="32"
                            fontWeight="bold"
                            fill="#22C55E"
                            textAnchor="middle"
                            letterSpacing="2px"
                        >
                            POTBELLY
                        </text>
                    </svg>
                </div>

                {/* Loading dots animation */}
                <div className="mt-8 flex space-x-2" role="status" aria-live="polite">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-green-500"></div>
                    <div className="h-3 w-3 animate-bounce rounded-full bg-green-500" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-3 w-3 animate-bounce rounded-full bg-green-500" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
