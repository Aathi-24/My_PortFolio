import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import Scene3D from "@/components/Scene3D";
import { AnimatedTitle, AnimatedParagraph } from "@/components/AnimatedText";
import Footer from "@/components/Footer";
const Home = () => {
  return <>
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <ParticleBackground />
      <Scene3D />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: "1s"
      }} />
      
      {/* Main Content */}
      <div className="relative z-10 container-custom px-4 pt-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glitch Label */}
          <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="inline-block mb-6">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-primary">
              ​Software Developer      
            </span>
          </motion.div>

          {/* Main Title */}
          <AnimatedTitle className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight" delay={0.3}>
            <span className="block text-foreground font-serif text-5xl">AADITHYA  VETTRIVEL</span>
            <span className="block gradient-text px-0 text-4xl font-serif">
            </span>
          </AnimatedTitle>

          {/* Subtitle */}
          <AnimatedParagraph className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8" delay={0.5}>
            I build immersive web applications that blend cutting-edge technology 
            with stunning design. Turning complex ideas into elegant solutions.
          </AnimatedParagraph>

          {/* CTA Buttons */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.7
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/projects">
              <motion.button whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px hsl(186 100% 50% / 0.4)"
              }} whileTap={{
                scale: 0.95
              }} className="px-8 py-4 bg-gradient-to-r from-primary to-neon-purple text-primary-foreground font-display font-semibold rounded-xl transition-all duration-300">
                View My Work
              </motion.button>
            </Link>
            <motion.a href="/resume.pdf" download whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="px-8 py-4 glass font-display font-semibold rounded-xl flex items-center gap-2 text-foreground hover:border-primary/50 transition-all duration-300">
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.9
          }} className="gap-4 flex items-end justify-center px-[50px]">
            {[{
              icon: Github,
              href: "https://github.com",
              label: "GitHub"
            }, {
              icon: Linkedin,
              href: "https://linkedin.com",
              label: "LinkedIn"
            }, {
              icon: Mail,
              href: "mailto:hello@developer.com",
              label: "Email"
            }].map(({
              icon: Icon,
              href,
              label
            }) => <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{
              scale: 1.2,
              y: -5
            }} whileTap={{
              scale: 0.9
            }} className="p-3 glass rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_hsl(186_100%_50%/0.3)] transition-all duration-300" aria-label={label}>
                <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>)}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1.2
        }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{
            y: [0, 10, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
    <Footer />
    </>;
};
export default Home;