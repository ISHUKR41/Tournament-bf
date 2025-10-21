"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Gamepad2,
  Users,
  Zap,
  Shield,
  Award,
  DollarSign,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "../components/navbar";
import { SlotsCounter } from "../components/slots-counter";
import { useStats } from "../hooks/useStats";
import { formatCurrency } from "../lib/utils";
import { AnimatedCounter } from "../components/animated-counter";
import { TooltipProvider } from "../components/ui/tooltip";
import { ParticlesBackground } from "../components/particles-background";
import { TypingAnimation } from "../components/typing-animation";
import { TiltCard } from "../components/tilt-card";
import { useInView } from "react-intersection-observer";
import { Fade, Slide, Bounce, Zoom } from "react-awesome-reveal";

// Dynamically import GSAP only on client side to avoid SSR issues
const useGSAP = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Import GSAP dynamically
    import("gsap").then((gsapModule) => {
      import("gsap/dist/ScrollTrigger").then((ScrollTriggerModule) => {
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);

        // Your GSAP animations here
        const statsCards = document.querySelectorAll(".stat-card");
        if (statsCards.length > 0) {
          gsap.fromTo(
            statsCards,
            { opacity: 0, y: 50, rotateX: -15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".stat-card",
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        const featureCards = document.querySelectorAll(".feature-card");
        if (featureCards.length > 0) {
          gsap.fromTo(
            featureCards,
            { opacity: 0, scale: 0.8, rotation: -5 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: ".feature-card",
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    });
  }, []);
};

export default function HomePage() {
  const { data: stats } = useStats();
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [tournamentsRef, tournamentsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const totalTeams = (stats?.pubgTeams || 0) + (stats?.freeFireTeams || 0);
  const totalRevenue = totalTeams * 80;
  const totalPlayers = totalTeams * 4;

  // Use GSAP animations
  useGSAP();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground />

        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden" ref={heroRef}>
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 sm:py-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-4 sm:mb-6"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-orange-500 mb-2 sm:mb-4" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text px-2">
                <TypingAnimation />
              </h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: heroInView ? 1 : 0 }}
                transition={{ delay: 0.5 }}
              >
                Join the most exciting gaming tournaments. Show your skills,
                compete with the best, and win amazing prizes! 🏆
              </motion.p>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-16">
              {[
                {
                  icon: Users,
                  value: totalTeams,
                  label: "Teams Registered",
                  color: "blue",
                  gradient: "from-blue-500 to-cyan-500",
                  delay: 0,
                },
                {
                  icon: Trophy,
                  value: totalPlayers,
                  label: "Total Players",
                  color: "yellow",
                  gradient: "from-yellow-500 to-orange-500",
                  delay: 0.1,
                },
                {
                  icon: DollarSign,
                  value: formatCurrency(totalRevenue),
                  label: "Prize Pool",
                  color: "green",
                  gradient: "from-green-500 to-emerald-500",
                  delay: 0.2,
                  isCurrency: true,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card relative group"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden hover:bg-white/10 transition-all">
                    {/* Animated Gradient Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Sparkle Effect */}
                    <motion.div
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </motion.div>

                    {/* Icon with 3D effect */}
                    <Bounce delay={index * 200}>
                      <motion.div
                        className="relative"
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: stat.delay,
                        }}
                      >
                        <div
                          className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} p-3 shadow-lg shadow-${stat.color}-500/50`}
                        >
                          <stat.icon className="w-full h-full text-white" />
                        </div>
                      </motion.div>
                    </Bounce>

                    {/* Value */}
                    <Zoom delay={index * 250}>
                      {stat.isCurrency ? (
                        <p className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                          {stat.value}
                        </p>
                      ) : (
                        <AnimatedCounter
                          value={stat.value as number}
                          className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight"
                        />
                      )}
                    </Zoom>

                    {/* Label */}
                    <Fade delay={index * 300}>
                      <p className="text-sm text-gray-400 font-medium">
                        {stat.label}
                      </p>
                    </Fade>

                    {/* Bottom accent line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: stat.delay }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament Cards */}
        <div
          className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
          ref={tournamentsRef}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: tournamentsInView ? 1 : 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text px-2"
          >
            Choose Your Tournament
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* PUBG Mobile Card */}
            <TiltCard className="group relative">
              <Link href="/pubg">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: tournamentsInView ? 1 : 0,
                    x: tournamentsInView ? 0 : -50,
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm border-2 border-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden hover:border-orange-500 transition-all cursor-pointer h-full"
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <motion.div
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Gamepad2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-orange-500" />
                      </motion.div>
                      <SlotsCounter game="pubg" variant="compact" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                      PUBG Mobile
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                      Squad Tournament - 4 Players per Team
                    </p>

                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <motion.div
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Winner: {formatCurrency(1000)} | Runner-up:{" "}
                          {formatCurrency(400)}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Entry Fee: {formatCurrency(80)} per team
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">
                          First come, first serve
                        </span>
                      </motion.div>
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-center text-sm sm:text-base group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all overflow-hidden relative"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span className="relative z-10">Register Now →</span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </TiltCard>

            {/* Free Fire Card */}
            <TiltCard className="group relative">
              <Link href="/freefire">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: tournamentsInView ? 1 : 0,
                    x: tournamentsInView ? 0 : 50,
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden hover:border-red-500 transition-all cursor-pointer h-full"
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <motion.div
                        animate={{
                          rotate: [0, -10, 0, 10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Zap className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-red-500" />
                      </motion.div>
                      <SlotsCounter game="freefire" variant="compact" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                      Free Fire
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                      Squad Tournament - 4 Players per Team
                    </p>

                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <motion.div
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Winner: {formatCurrency(500)} | Runner-up:{" "}
                          {formatCurrency(260)}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Entry Fee: {formatCurrency(80)} per team
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">
                          First come, first serve
                        </span>
                      </motion.div>
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-center text-sm sm:text-base group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all overflow-hidden relative"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 1,
                        }}
                      />
                      <span className="relative z-10">Register Now →</span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </TiltCard>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <Slide direction="up" triggerOnce>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Why Choose Us?
            </motion.h2>
          </Slide>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                text: "Lightning Fast",
                color: "text-yellow-500",
                gradient: "from-yellow-500 to-orange-500",
                desc: "Instant registration & real-time updates",
              },
              {
                icon: Shield,
                text: "100% Secure",
                color: "text-blue-500",
                gradient: "from-blue-500 to-cyan-500",
                desc: "Your data is encrypted and protected",
              },
              {
                icon: Award,
                text: "Cash Prizes",
                color: "text-green-500",
                gradient: "from-green-500 to-emerald-500",
                desc: "Win real money - paid within 24 hours",
              },
              {
                icon: Target,
                text: "Fair Gameplay",
                color: "text-red-500",
                gradient: "from-red-500 to-pink-500",
                desc: "Strict anti-cheat & fair play policies",
              },
              {
                icon: Users,
                text: "Active Community",
                color: "text-purple-500",
                gradient: "from-purple-500 to-pink-500",
                desc: "Join thousands of competitive players",
              },
              {
                icon: TrendingUp,
                text: "Level Up",
                color: "text-indigo-500",
                gradient: "from-indigo-500 to-purple-500",
                desc: "Improve your skills in every match",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card group relative"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden hover:bg-white/10 transition-all h-full">
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10`}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Icon */}
                  <Bounce delay={index * 100} triggerOnce>
                    <motion.div
                      className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </motion.div>
                  </Bounce>

                  {/* Title */}
                  <Fade delay={index * 150} triggerOnce>
                    <h3 className="text-white font-bold text-lg mb-2 text-center">
                      {feature.text}
                    </h3>
                  </Fade>

                  {/* Description */}
                  <Slide direction="up" delay={index * 200} triggerOnce>
                    <p className="text-gray-400 text-sm text-center leading-relaxed">
                      {feature.desc}
                    </p>
                  </Slide>

                  {/* Accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-12 sm:mt-16 md:mt-20">
          <div className="container mx-auto px-4 py-6 sm:py-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">
              © 2025 Tournament Hub. All rights reserved.
            </p>
            <p className="mt-2 text-xs sm:text-sm">
              Play fair, have fun, and may the best team win! 🎮
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
