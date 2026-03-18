"use client";

import { useEffect, useRef, useState } from "react";

// Mock TweetCard component that mimics the tweet card design
const TweetCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);
    
    // Use index-based static values to avoid hydration errors
    const baseLikeCount = 50 + (index * 7) % 40;
    const baseRetweetCount = 8 + (index * 3) % 15;
    
    const [likeCount, setLikeCount] = useState(baseLikeCount);
    const [retweetCount, setRetweetCount] = useState(baseRetweetCount);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleRetweet = () => {
        setIsRetweeted(!isRetweeted);
        setRetweetCount(prev => isRetweeted ? prev - 1 : prev + 1);
    };

    return (
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 h-64 sm:h-80 flex flex-col">
            {/* Header with user info */}
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 flex-shrink-0">
                <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-cyan-400/60">
                    <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-white font-semibold text-sm sm:text-base truncate">{testimonial.author}</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 3.95-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.35 0-.69-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                    </div>
                    <div className="text-zinc-500 text-xs sm:text-sm truncate">@{testimonial.company.toLowerCase().replace(/\s+/g, '')}</div>
                </div>
                <div className="text-zinc-500 text-xs sm:text-sm flex-shrink-0">
                    2h
                </div>
            </div>

            {/* Tweet content - with line clamping */}
            <div className="text-white text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 flex-1 overflow-hidden">
                <p className="overflow-hidden text-ellipsis" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {testimonial.quote}
                </p>
            </div>

            {/* Tweet actions */}
            <div className="flex items-center gap-4 sm:gap-6 text-zinc-500 flex-shrink-0 mt-auto">
                <div className="flex items-center gap-1 sm:gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-xs sm:text-sm">24</span>
                </div>
                
                <div 
                    className={`flex items-center gap-1 sm:gap-2 transition-all duration-200 cursor-pointer group ${
                        isRetweeted ? 'text-green-400' : 'hover:text-green-400'
                    }`}
                    onClick={handleRetweet}
                >
                    <svg 
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
                            isRetweeted ? 'scale-110' : 'group-hover:scale-110'
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-xs sm:text-sm">{retweetCount}</span>
                </div>
                
                <div 
                    className={`flex items-center gap-1 sm:gap-2 transition-all duration-200 cursor-pointer group ${
                        isLiked ? 'text-red-400' : 'hover:text-red-400'
                    }`}
                    onClick={handleLike}
                >
                    <svg 
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                            isLiked ? 'scale-110 fill-current' : 'group-hover:scale-110'
                        }`} 
                        fill={isLiked ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs sm:text-sm">{likeCount}</span>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const testimonials = [
    {
        quote: "Just discovered @codentis and it's completely transformed my development workflow. The AI assistance is incredibly intuitive and saves me hours every day. #coding #AI",
        author: "Sarah Chen",
        company: "TechFlow Inc"
    },
    {
        quote: "The terminal integration in @codentis is seamless. I can get intelligent code suggestions without leaving my command line environment. This is what I've been waiting for! 🚀",
        author: "Marcus Rodriguez",
        company: "CloudScale"
    },
    {
        quote: "Best AI coding assistant I've used. The context awareness and code generation quality are outstanding. @codentis is a game-changer for developers.",
        author: "Emily Watson",
        company: "InnovateLabs"
    },
    {
        quote: "@codentis understands my codebase better than any other tool. It's like having a senior developer pair programming with me 24/7. Highly recommend! 💯",
        author: "David Kim",
        company: "PixelCraft"
    },
    {
        quote: "The refactoring suggestions in @codentis are spot-on. It's helped me clean up legacy code and implement modern patterns effortlessly. Love it!",
        author: "Lisa Thompson",
        company: "BuildRight"
    },
    {
        quote: "Open source and powerful. @codentis gives me the AI assistance I need while keeping my code and data secure. Perfect for enterprise development.",
        author: "Alex Johnson",
        company: "SecureStack"
    },
    {
        quote: "I love how @codentis integrates with my existing workflow. No need to switch between different tools or platforms. Everything I need is right there in my terminal.",
        author: "Rachel Park",
        company: "DevCorp"
    },
    {
        quote: "Game-changer for productivity. The code suggestions in @codentis are always relevant and help me write better code faster. Can't imagine coding without it now!",
        author: "Tom Wilson",
        company: "StartupLab"
    }
];

// Random shuffle function for testimonials
const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function Testimonials() {
    const ref = useRef<HTMLDivElement>(null);
    const [shuffledTestimonials, setShuffledTestimonials] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Only shuffle on client side to avoid hydration mismatch
        setIsClient(true);
        setShuffledTestimonials(shuffleArray(testimonials));
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("revealed");
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
        );

        const els = ref.current?.querySelectorAll(".reveal");
        if (els) {
            // Create array of deterministic delays based on index
            els.forEach((el, i) => {
                const delay = (i * 0.1) % 0.8;
                (el as HTMLElement).style.transitionDelay = `${delay}s`;
                obs.observe(el);
            });
        }

        return () => obs.disconnect();
    }, []);

    return (
        <>
            {/* Testimonials Section */}
            <section id="reviews" className="py-32 sm:py-40 bg-black relative" ref={ref}>
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg-0 to-transparent pointer-events-none z-[1]" />

            <div className="w-full px-8 sm:px-10 lg:px-16 relative z-[2]">
                {/* Header */}
                <div className="text-center mb-20 reveal">
                    <h2 className="text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-white mb-4">
                        What our users are saying.
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {isClient ? shuffledTestimonials.map((testimonial, i) => (
                        <div key={i} className="reveal">
                            <TweetCard testimonial={testimonial} index={i} />
                        </div>
                    )) : testimonials.slice(0, 8).map((testimonial, i) => (
                        <div key={i} className="reveal">
                            <TweetCard testimonial={testimonial} index={i} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-0 to-transparent pointer-events-none z-[1]" />
        </section>

        {/* Statistics Section */}
        <section className="py-8 sm:py-12 bg-black relative">
            <div className="w-full px-8 sm:px-10 lg:px-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                            1000+
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-400">
                            Active Developers
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">
                            50K+
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-400">
                            Lines of Code Generated
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                            2500+
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-400">
                            Bugs Fixed
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">
                            98%
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-400">
                            Developer Satisfaction
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}