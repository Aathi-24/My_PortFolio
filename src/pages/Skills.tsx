import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
const skillCategories = [{
  title: "Frontend",
  skills: [{
    name: "HTML",
    level: 70
  }, {
    name: "CSS",
    level: 65
  }, {
    name: "TypeScript",
    level: 10
  }, {
    name: "Next.js",
    level: 10
  }, {
    name: "Tailwind CSS",
    level: 10
  }, {
    name: "Three.js",
    level: 10
  }, {
    name: "Framer Motion",
    level: 10
  }],
  gradient: "from-primary to-neon-blue"
}, {
  title: "Backend",
  skills: [{
    name: "Node.js",
    level: 20
  }, {
    name: "Python",
    level: 95
  }, {
    name: "MySQL",
    level: 95
  }, {
    name: "MongoDB",
    level: 60
  }, {
    name: "Java",
    level: 95
  }, {
    name: "C++",
    level: 75
  }, {
    name: "C",
    level: 90
  }, {
    name: "REST APIs",
    level: 60
  }],
  gradient: "from-secondary to-neon-magenta"
}, {
  title: "DevOps & Tools",
  skills: [{
    name: "Git",
    level: 95
  }, {
    name: "Unity",
    level: 80
  }, {
    name: "Azure",
    level: 70
  }, {
    name: "Unreal Engine",
    level: 70
  }, {
    name: "Blender",
    level: 90
  }, {
    name: "Figma",
    level: 30
  }, {
    name: "Flutter",
    level: 40
  }],
  gradient: "from-neon-purple to-primary"
}];
const SkillBar = ({
  name,
  level,
  gradient,
  index
}: {
  name: string;
  level: number;
  gradient: string;
  index: number;
}) => {
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} whileInView={{
    opacity: 1,
    x: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} className="group">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <span className="text-muted-foreground text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div initial={{
        width: 0
      }} whileInView={{
        width: `${level}%`
      }} viewport={{
        once: true
      }} transition={{
        duration: 1,
        delay: 0.3 + index * 0.1,
        ease: "easeOut"
      }} className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}>
          <motion.div animate={{
          x: ["-100%", "100%"]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </motion.div>;
};
const Skills = () => {
  return <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            Technical Skills
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Expertise</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience
          </p>
        </AnimatedSection>

        {/* Skills Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(category => <StaggerItem key={category.title}>
              <motion.div whileHover={{
            y: -5
          }} className="glass rounded-2xl p-6 h-full hover:shadow-[0_0_30px_hsl(186_100%_50%/0.2)] transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient}`} />
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill, index) => <SkillBar key={skill.name} name={skill.name} level={skill.level} gradient={category.gradient} index={index} />)}
                </div>
              </motion.div>
            </StaggerItem>)}
        </StaggerContainer>

        {/* Coding Profiles */}
        <AnimatedSection delay={0.4} className="mt-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            <span className="text-foreground">MY </span>
            <span className="gradient-text-secondary">Profiles</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[{
            name: "GitHub",
            url: "https://github.com",
            icon: "🐙",
            stats: "500+ commits"
          }, {
            name: "LeetCode",
            url: "https://leetcode.com",
            icon: "💻",
            stats: "200+ solved"
          }, {
            name: "HackerRank",
            url: "https://hackerrank.com",
            icon: "✏️",
            stats: "50+ problems"
          }, {
            name: "Linkedin",
            url: "https://linkedin.com",
            icon: "📚",
            stats: "5k+ rep"
          }].map((profile, index) => <motion.a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            scale: 1.05,
            y: -5
          }} className="glass rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(186_100%_50%/0.3)] transition-all duration-300">
                <span className="text-3xl">{profile.icon}</span>
                <div>
                  <div className="font-display font-semibold text-foreground">{profile.name}</div>
                  
                </div>
              </motion.a>)}
          </div>
        </AnimatedSection>
      </div>
    </div>;
};
export default Skills;