import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 md:px-8 border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <span className="font-display font-bold text-primary-foreground text-lg">D</span>
              </motion.div>
              <span className="font-display text-lg font-semibold gradient-text">
                DEVELOPER
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Full-Stack Developer & Creative Technologist. Building the future, one line at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:border-primary/50 border border-border/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Developer
          </p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
