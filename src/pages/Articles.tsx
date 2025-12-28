import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import GlowCard from "@/components/GlowCard";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "Building Immersive 3D Web Experiences with Three.js",
    excerpt: "Learn how to create stunning 3D graphics in the browser using Three.js and React.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    tags: ["Three.js", "React", "WebGL"],
    url: "#",
  },
  {
    title: "The Future of Frontend: What to Expect in 2025",
    excerpt: "A deep dive into emerging trends, tools, and technologies shaping frontend development.",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    tags: ["Frontend", "Trends", "JavaScript"],
    url: "#",
  },
  {
    title: "Mastering Framer Motion Animations",
    excerpt: "Create silky smooth animations that delight users and enhance user experience.",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1550063873-ab792950096b?w=800&h=400&fit=crop",
    tags: ["Animation", "React", "Framer Motion"],
    url: "#",
  },
  {
    title: "TypeScript Best Practices for Large Scale Apps",
    excerpt: "Essential patterns and practices for building maintainable TypeScript applications.",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    tags: ["TypeScript", "Best Practices", "Architecture"],
    url: "#",
  },
];

const ArticleCard = ({ article, index }: { article: typeof articles[0]; index: number }) => {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group block"
    >
      <GlowCard className="h-full overflow-hidden p-0">
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <motion.img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            Read Article
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </GlowCard>
    </motion.a>
  );
};

const Articles = () => {
  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <div className="container-custom max-w-7xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <motion.span 
              className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
            >
              Blog & Articles
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Featured </span>
              <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing knowledge and insights about web development, design, and technology
            </p>
          </AnimatedSection>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {articles.map((article, index) => (
              <ArticleCard key={article.title} article={article} index={index} />
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
              href="https://medium.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-display font-semibold text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(186_100%_50%/0.3)] transition-all duration-300"
            >
              View All on Medium
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Articles;
