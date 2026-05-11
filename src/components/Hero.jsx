import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Terminal from "./Terminal";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section
            id="home"
            className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden"
        >
            {/* Background ambient */}
            <div
                className="absolute inset-0 bg-grid opacity-60 pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute top-1/4 -end-20 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none animate-glow-pulse"
                style={{
                    background:
                        "radial-gradient(circle, #bf77f6 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 -start-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none animate-glow-pulse"
                style={{
                    background:
                        "radial-gradient(circle, #bf77f6 0%, transparent 70%)",
                    animationDelay: "1.5s",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl w-full px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div
                        variants={item}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="font-mono text-xs sm:text-sm text-muted">
                            {t("hero.status")}
                        </span>
                    </motion.div>

                    <motion.p
                        variants={item}
                        className="font-mono text-sm text-accent-500 mb-4"
                    >
                        {t("hero.greeting")}
                    </motion.p>

                    <motion.h1
                        variants={item}
                        className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance"
                    >
                        {t("hero.name")}
                        <span className="text-accent-500">.</span>
                    </motion.h1>

                    <motion.div
                        variants={item}
                        className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1"
                    >
                        <h2 className="font-mono text-lg sm:text-xl text-muted">
                            <span className="text-accent-500">&gt;</span>{" "}
                            {t("hero.role")}
                        </h2>
                        <span className="inline-flex items-center gap-1 font-mono text-sm text-muted">
                            <MapPin className="w-3.5 h-3.5" /> Morocco
                        </span>
                    </motion.div>

                    <motion.p
                        variants={item}
                        className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed text-balance"
                    >
                        {t("hero.tagline")}
                    </motion.p>

                    <motion.div
                        variants={item}
                        className="mt-9 flex flex-wrap gap-3"
                    >
                        <a href="#projects" className="btn-primary group">
                            {t("hero.cta_primary")}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                        </a>
                        <a href="#contact" className="btn-secondary">
                            <Mail className="w-4 h-4" />
                            {t("hero.cta_secondary")}
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right: terminal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex justify-center lg:justify-end"
                >
                    <div className="relative animate-float">
                        {/* Glow behind terminal */}
                        <div
                            className="absolute -inset-8 rounded-3xl opacity-50 blur-3xl"
                            style={{
                                background:
                                    "radial-gradient(circle, #bf77f6 0%, transparent 70%)",
                            }}
                            aria-hidden="true"
                        />
                        <Terminal />
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 font-mono text-xs text-muted"
                aria-hidden="true"
            >
                <span>scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-accent-500 to-transparent" />
            </motion.div>
        </section>
    );
}
