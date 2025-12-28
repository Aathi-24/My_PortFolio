import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "magenta" | "purple";
}

const glowColors = {
  cyan: "hover:shadow-[0_0_30px_hsl(186_100%_50%/0.3)]",
  magenta: "hover:shadow-[0_0_30px_hsl(300_100%_70%/0.3)]",
  purple: "hover:shadow-[0_0_30px_hsl(270_100%_65%/0.3)]",
};

const borderColors = {
  cyan: "hover:border-primary/50",
  magenta: "hover:border-secondary/50",
  purple: "hover:border-neon-purple/50",
};

const GlowCard = ({ children, className = "", glowColor = "cyan" }: GlowCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        glass rounded-2xl p-6 transition-all duration-500
        ${glowColors[glowColor]} ${borderColors[glowColor]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
