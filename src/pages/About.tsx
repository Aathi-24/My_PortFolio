import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import GlowCard from "@/components/GlowCard";
const highlights = [{
  icon: Code2,
  title: "Clean Code",
  description: "Writing maintainable, scalable code that stands the test of time.",
  color: "cyan" as const
}, {
  icon: Palette,
  title: "Creative Design",
  description: "Blending aesthetics with functionality for memorable experiences.",
  color: "magenta" as const
}, {
  icon: Rocket,
  title: "Performance",
  description: "Optimizing every millisecond for lightning-fast applications.",
  color: "purple" as const
}, {
  icon: Zap,
  title: "Innovation",
  description: "Staying ahead with cutting-edge technologies and trends.",
  color: "cyan" as const
}];
const About = () => {
  return <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
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
              <motion.div animate={{
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.02, 1, 1.02, 1]
            }} transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                
              </motion.div>
              
              {/* Floating elements */}
              
              
              
            </div>
          </AnimatedSection>

          {/* Text Content */}
          <AnimatedSection delay={0.4}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Building the Future, <span className="gradient-text">One Line at a Time</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>​I’m a Computer Science and Engineering student with a growing passion for software development, problem-solving, and building technology that makes an impact. I enjoy exploring how things work—whether it’s writing clean, efficient code or understanding the design behind scalable systems.


 I’m actively developing my skills in Java, Python, C, data structures, algorithms, object-oriented programming, databases, and web development, and I’m always looking for opportunities to apply what I learn to real projects</p>
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

              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="inline-block">
                <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-neon-purple text-primary-foreground font-display font-semibold rounded-xl" href="https://drive.google.com/file/d/12R1KG5XGMEdK1YOHuUXcRA_tD2teTtwS/view?usp=drive_link">
                  Download Resume
                </a>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Highlights Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map(item => <StaggerItem key={item.title}>
              <GlowCard glowColor={item.color} className="h-full text-center">
                <motion.div whileHover={{
              rotate: 360,
              scale: 1.2
            }} transition={{
              duration: 0.5
            }} className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </GlowCard>
            </StaggerItem>)}
        </StaggerContainer>
      </div>
    </div>;
};
export default About;