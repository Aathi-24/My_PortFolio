import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import portfolioImage from "@/assets/portfolio-project.jpg";
import coinCollectorImage from "@/assets/coin-collector-game.jpg";
import miniProjectsImage from "@/assets/mini-projects.jpg";

const projects = [
  {
    title: "My Portfolio",
    description: "A modern, interactive portfolio website built with React, TypeScript, and Three.js. Features stunning 3D elements, particle animations, and smooth page transitions.",
    image: portfolioImage,
    tags: ["React", "TypeScript", "Three.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Aathi-24/My_PortFolio",
    featured: true,
  },
  {
    title: "Coin Collector Game",
    description: "An exciting 2D platformer game developed in Unity. Players navigate through levels collecting coins while avoiding obstacles. Features fun gameplay mechanics and colorful visuals.",
    image: coinCollectorImage,
    tags: ["Unity", "C#", "2D Game Dev", "Game Design"],
    liveUrl: "#",
    githubUrl: "https://github.com/Aathi-24/Coin_Collector_game_Unity_2D",
    featured: true,
  },
  {
    title: "Mini Projects Collection",
    description: "A collection of small Python projects developed during college coursework. Includes utilities, automation scripts, and practice programs showcasing various programming concepts.",
    image: miniProjectsImage,
    tags: ["Python", "Automation", "Utilities", "College Projects"],
    liveUrl: "#",
    githubUrl: "https://github.com/Aathi-24/Mini-Projects-",
    featured: false,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`group relative glass rounded-2xl overflow-hidden ${
        project.featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-primary text-primary-foreground rounded-xl"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 glass-strong rounded-xl"
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="container-custom max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            Featured Work
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/Aathi-24"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-display font-semibold text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(186_100%_50%/0.3)] transition-all duration-300"
          >
            View All on GitHub
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
