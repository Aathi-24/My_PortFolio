import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import GlowCard from "@/components/GlowCard";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time.",
    color: "cyan" as const,
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Blending aesthetics with functionality for memorable experiences.",
    color: "magenta" as const,
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing every millisecond for lightning-fast applications.",
    color: "purple" as const,
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Staying ahead with cutting-edge technologies and trends.",
    color: "cyan" as const,
  },
];

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            About Me
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">Who I </span>
            <span className="gradient-text">Am</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer on a mission to create exceptional digital experiences
          </p>
        </AnimatedSection>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image/Visual */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.02, 1, 1.02, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="glass rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="relative aspect-square rounded-2xl bg-muted/50 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border-2 border-dashed border-primary/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-16 border-2 border-dashed border-secondary/30 rounded-full"
                  />
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl"
              >
                <span className="text-primary font-display font-bold">5+</span>
                <span className="text-muted-foreground text-sm ml-1">Years Exp</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-xl"
              >
                <span className="text-secondary font-display font-bold">50+</span>
                <span className="text-muted-foreground text-sm ml-1">Projects</span>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Text Content */}
          <AnimatedSection delay={0.4}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Building the Future, <span className="gradient-text">One Line at a Time</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hey there! I'm a full-stack developer with a deep passion for creating 
                  immersive digital experiences. With over 5 years of experience, I've had 
                  the privilege of working on everything from startup MVPs to enterprise-scale 
                  applications.
                </p>
                <p>
                  My journey began with a curiosity about how things work on the web, and it 
                  has evolved into a career dedicated to pushing the boundaries of what's 
                  possible with modern web technologies.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new frameworks, contributing 
                  to open source, or sharing knowledge with the developer community through 
                  articles and talks.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a 
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-neon-purple text-primary-foreground font-display font-semibold rounded-xl"
                >
                  Download Resume
                </a>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Highlights Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <GlowCard glowColor={item.color} className="h-full text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};

export default About;
