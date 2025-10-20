'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trophy, Gamepad2, Users, Zap, Shield, Award, DollarSign, Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { SlotsCounter } from '@/components/slots-counter'
import { useStats } from '@/hooks/useStats'
import { formatCurrency } from '@/lib/utils'
import { AnimatedCounter } from '@/components/animated-counter'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ParticlesBackground } from '@/components/particles-background'
import { TypingAnimation } from '@/components/typing-animation'
import { TiltCard } from '@/components/tilt-card'
import { useInView } from 'react-intersection-observer'

export default function HomePage() {
  const { data: stats } = useStats()
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [tournamentsRef, tournamentsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const totalTeams = (stats?.pubgTeams || 0) + (stats?.freeFireTeams || 0)
  const totalRevenue = totalTeams * 80
  const totalPlayers = totalTeams * 4

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
            ease: 'easeInOut'
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
                ease: 'easeInOut'
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
              Join the most exciting gaming tournaments. Show your skills, compete with the best, and win amazing prizes! 🏆
            </motion.p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-16"
          >
            {[
              { icon: Users, value: totalTeams, label: 'Teams Registered', color: 'blue', delay: 0 },
              { icon: Trophy, value: totalPlayers, label: 'Total Players', color: 'yellow', delay: 0.1 },
              { icon: DollarSign, value: formatCurrency(totalRevenue), label: 'Prize Pool', color: 'green', delay: 0.2, isCurrency: true },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0.8 }}
                transition={{ delay: 0.8 + stat.delay }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                {/* Glowing Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <stat.icon className={`w-10 h-10 sm:w-12 sm:h-12 text-${stat.color}-500 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform`} />
                </motion.div>
                {stat.isCurrency ? (
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                ) : (
                  <AnimatedCounter value={stat.value as number} className="text-2xl sm:text-3xl font-bold text-white mb-1" />
                )}
                <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16" ref={tournamentsRef}>
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
                animate={{ opacity: tournamentsInView ? 1 : 0, x: tournamentsInView ? 0 : -50 }}
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
                    ease: 'easeInOut',
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
                        ease: 'easeInOut',
                      }}
                    >
                      <Gamepad2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-orange-500" />
                    </motion.div>
                    <SlotsCounter game="pubg" variant="compact" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">PUBG Mobile</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">Squad Tournament - 4 Players per Team</p>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <motion.div 
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">Winner: {formatCurrency(1000)} | Runner-up: {formatCurrency(400)}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">Entry Fee: {formatCurrency(80)} per team</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">First come, first serve</span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-center text-sm sm:text-base group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all overflow-hidden relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
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
                animate={{ opacity: tournamentsInView ? 1 : 0, x: tournamentsInView ? 0 : 50 }}
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
                    ease: 'easeInOut',
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
                        ease: 'easeInOut',
                      }}
                    >
                      <Zap className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-red-500" />
                    </motion.div>
                    <SlotsCounter game="freefire" variant="compact" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Free Fire</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">Squad Tournament - 4 Players per Team</p>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <motion.div 
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">Winner: {formatCurrency(500)} | Runner-up: {formatCurrency(260)}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">Entry Fee: {formatCurrency(80)} per team</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">First come, first serve</span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-center text-sm sm:text-base group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all overflow-hidden relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {[
            { icon: Zap, text: 'Instant Registration', color: 'text-yellow-500', desc: 'Quick & easy sign-up process' },
            { icon: Shield, text: 'Fair Play Guaranteed', color: 'text-blue-500', desc: 'Strict anti-cheat policies' },
            { icon: Award, text: 'Cash Prizes', color: 'text-green-500', desc: 'Win real money rewards' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all text-center"
            >
              <feature.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} mx-auto mb-2 sm:mb-3`} />
              <p className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{feature.text}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">© 2025 Tournament Hub. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">Play fair, have fun, and may the best team win! 🎮</p>
        </div>
      </footer>
    </div>
    </TooltipProvider>
  )
}
