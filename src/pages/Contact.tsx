import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedText";
import { toast } from "sonner";
const contactInfo = [{
  icon: Mail,
  label: "Email",
  value: "aadithyavettrivel24@gmail.com",
  href: "mailto:aadithyavettrivel24@gmail.com"
}, {
  icon: MapPin,
  label: "Location",
  value: "Coimbatore, India",
  href: "#"
}, {
  icon: Phone,
  label: "Phone",
  value: "+91-94889-41788",
  href: "tel:+919488941788"
}];
const socialLinks = [{
  icon: Github,
  label: "GitHub",
  href: "https://github.com"
}, {
  icon: Linkedin,
  label: "LinkedIn",
  href: "https://linkedin.com"
}, {
  icon: Twitter,
  label: "Twitter",
  href: "https://twitter.com"
}, {
  icon: Instagram,
  label: "Instagram",
  href: "https://instagram.com"
}];
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };
  return <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            Get In Touch
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-foreground">Let's </span>
            <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <motion.form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <motion.input whileFocus={{
                  scale: 1.01
                }} type="text" required value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Type your Name here....." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <motion.input whileFocus={{
                  scale: 1.01
                }} type="email" required value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Type your mail here...." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <motion.input whileFocus={{
                scale: 1.01
              }} type="text" required value={formData.subject} onChange={e => setFormData({
                ...formData,
                subject: e.target.value
              })} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Type your Subject here....." />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <motion.textarea whileFocus={{
                scale: 1.01
              }} required rows={5} value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Tell me about your project..." />
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px hsl(186 100% 50% / 0.4)"
            }} whileTap={{
              scale: 0.98
            }} className="w-full py-4 bg-gradient-to-r from-primary to-neon-purple text-primary-foreground font-display font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                {isSubmitting ? <motion.div animate={{
                rotate: 360
              }} transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" /> : <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>}
              </motion.button>
            </motion.form>
          </AnimatedSection>

          {/* Contact Info & Social */}
          <AnimatedSection delay={0.4} className="space-y-8">
            {/* Contact Info */}
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => <motion.a key={item.label} href={item.href} initial={{
                opacity: 0,
                x: 20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }} whileHover={{
                x: 5
              }} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:shadow-[0_0_20px_hsl(186_100%_50%/0.3)] transition-all">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium text-foreground">{item.value}</div>
                    </div>
                  </motion.a>)}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Follow Me
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((item, index) => <motion.a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" initial={{
                opacity: 0,
                scale: 0
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1,
                type: "spring"
              }} whileHover={{
                scale: 1.1,
                y: -5
              }} whileTap={{
                scale: 0.9
              }} className="p-4 rounded-xl bg-muted/50 hover:bg-primary/10 hover:border-primary/50 border border-border/50 hover:shadow-[0_0_20px_hsl(186_100%_50%/0.3)] transition-all" aria-label={item.label}>
                    <item.icon className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.a>)}
              </div>
            </div>

            {/* CTA */}
            <motion.div whileHover={{
            scale: 1.02
          }} className="glass rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-hero-gradient opacity-50" />
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Ready to Start?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Let's bring your ideas to life together.
                </p>
                <a className="inline-flex items-center gap-2 text-primary font-semibold hover:underline" href="\u200Baadithyavettrivel24@gmail.com">
                  ​aadithyavettrivel24@gmail.com
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </div>;
};
export default Contact;