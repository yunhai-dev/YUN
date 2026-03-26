"use client";

import {Button} from "./ui/button";
import {motion} from "framer-motion";
import {TypeAnimation} from 'react-type-animation';
import {Link} from "next-view-transitions"
import {STORAGE_HOST} from "@/data/baseUrl";
import dynamic from 'next/dynamic';
import {useEffect, useState} from "react";

const Particles = dynamic(() => import("@/components/blocks/Backgrounds/Particles/Particles"), {
    ssr: false,
    loading: () => <div className="size-full" />
});

function ProductDiagram() {
    const imageMap = [
        {
            src: `${STORAGE_HOST}/workflow.webp`,
            alt: "Workflow",
        },
        {
            src: `${STORAGE_HOST}/agent.webp`,
            alt: "Agent",
        },
        {
            src: `${STORAGE_HOST}/admin-panel.webp`,
            alt: "admin-panel",
        },
    ]
    return (
        <div
            className="relative flex flex-col items-center justify-center size-full pt-40"
        >
            {
                imageMap.map((image, index) => (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -200,
                            rotateX: 40,
                            rotateY: 10,
                            rotateZ: -20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            rotateX: 40,
                            rotateY: 10,
                            rotateZ: -20,
                            translateX: index * 50,
                            translateY: index * -40,
                        }}
                        viewport={{once: true, amount: 0.3}}
                        key={index}
                        exit={{opacity: 0, x: 0}}
                        transition={{duration: 1, delay: !index ? 0 : index + 0.3}}
                        className={index ? "max-w-4xl mx-auto absolute bottom-13" : "max-w-4xl mx-auto"}
                    >
                        <img
                            className="rounded-md w-full max-w-[800px] border border-gray-100/20"
                            loading={index === 0 ? "eager" : "lazy"}
                            src={image.src}
                            alt={image.alt}
                        />
                    </motion.div>
                ))
            }
        </div>
    )
}

export function Hero() {
    const [particleColor, setParticleColor] = useState('#ffffff');
    const [particleCount, setParticleCount] = useState(60);
    const [showParticles, setShowParticles] = useState(false);

    useEffect(() => {
        const updateParticleColor = () => {
            const isDark = document.documentElement.classList.contains('light');
            setParticleColor(isDark ? '#000000' : '#ffffff');
        };

        const updateParticleCount = () => {
            setParticleCount(window.innerWidth < 768 ? 20 : 60);
        };

        updateParticleColor();
        updateParticleCount();

        const timer = setTimeout(() => setShowParticles(true), 100);

        const observer = new MutationObserver(updateParticleColor);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        window.addEventListener('resize', updateParticleCount);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateParticleCount);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-10 pb-24">
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, x: 100}} // 添加退出动画
                transition={{duration: 2}} // 为进入和退出动画设置时长
                className="w-full mx-auto relative min-h-screen h-fit flex flex-col justify-center"
            >
                <div className="absolute size-full z-0">
                    {showParticles && (
                        <Particles
                            particleColors={[particleColor, particleColor]}
                            particleCount={particleCount}
                            particleSpread={10}
                            speed={0.1}
                            particleBaseSize={80}
                            moveParticlesOnHover={false}
                            alphaParticles={false}
                            disableRotation={false}
                        />
                    )}
                </div>

                <div className="z-10">
                    <TypeAnimation
                        sequence={[
                            "你好，我是云海",
                            1000,
                            '科技改变生活',
                            1000,
                            '技术服务于人',
                            1000
                        ]}
                        wrapper="h1"
                        cursor={true}
                        repeat={Infinity}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
                    />
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                      有所为，有所爱，有所期待
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" asChild className="px-8 py-6 text-base">
                            <Link href="/docs">开始阅读</Link>
                        </Button>

                        <Button size="lg" variant="secondary" asChild className="px-8 py-6 text-base">
                            <Link href="/about" className="flex items-center gap-2">
                                <span>了解我</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="min-h-[600px] w-full">
                <ProductDiagram/>
            </div>

            {/* Moved this section out of absolute positioning and added margin */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.3}}
                className="text-center mt-24"
            >
                <p className="text-sm text-muted-foreground my-8">
                    路漫漫其修远兮，吾将上下而求索
                </p>
                <div className="flex flex-wrap justify-center gap-3 px-4">
                    {['记录', '分享', '学习', '探索', '生活', '热爱'].map((value, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-5 py-2 text-sm font-medium text-foreground bg-secondary/50 border border-border rounded-full cursor-default hover:bg-secondary hover:border-foreground/20 transition-colors"
                        >
                            {value}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
