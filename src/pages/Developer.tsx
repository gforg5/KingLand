import { motion } from "framer-motion";
import { Code2, Terminal, Globe2, Cpu, Github, Linkedin, Mail, MapPin, Sparkles, Zap, Shield, Rocket } from "lucide-react";

const skills = [
  { icon: Code2, label: "Full-Stack Development", desc: "React, TypeScript, Node.js" },
  { icon: Terminal, label: "Systems Architecture", desc: "Scalable & maintainable systems" },
  { icon: Globe2, label: "Web Technologies", desc: "Modern frameworks & APIs" },
  { icon: Cpu, label: "Cloud & DevOps", desc: "AWS, Docker, CI/CD" },
  { icon: Shield, label: "Security First", desc: "Secure by design" },
  { icon: Rocket, label: "Performance", desc: "Optimized for speed" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Developer() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-24 sm:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-emerald/30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Avatar Glow Ring */}
            <motion.div
              className="relative inline-block mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald via-gold to-emerald opacity-50 blur-md" />
              <motion.div
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full gradient-accent flex items-center justify-center shadow-glow"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">
                  SMA
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald/10 border border-emerald/20 px-4 py-1.5 mb-4">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-emerald-light">Systems Developer</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
                <span className="text-secondary-foreground">Sayed </span>
                <span className="text-gradient-gold">Mohsin Ali</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Systems Developer passionate about building high-performance, scalable applications that deliver real value. Crafting digital experiences with precision and purpose.
              </p>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-emerald" />
                <span className="text-sm">Pakhtunkhwa, Pakistan</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground mb-3">
              Technical <span className="text-gradient-emerald">Expertise</span>
            </h2>
            <p className="text-muted-foreground">Core competencies & specializations</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group p-6 rounded-xl bg-navy-light/40 border border-navy-light/60 hover:border-emerald/40 hover:shadow-glow transition-all duration-300 cursor-default"
              >
                <div className="p-3 rounded-lg bg-emerald/10 inline-block mb-4 group-hover:bg-emerald/20 transition-colors">
                  <skill.icon className="h-6 w-6 text-emerald" />
                </div>
                <h3 className="font-display font-bold text-lg text-secondary-foreground mb-1 group-hover:text-emerald transition-colors">
                  {skill.label}
                </h3>
                <p className="text-sm text-muted-foreground">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Zap className="h-10 w-10 text-gold mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Development <span className="text-gradient-gold">Philosophy</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              "I believe in writing code that is not just functional, but elegant. Every system I build is designed with scalability, security, and user experience at its core. Clean architecture isn't just a preference — it's a standard."
            </p>
            <div className="flex items-center justify-center gap-1 text-emerald">
              <span className="w-12 h-px bg-emerald/40" />
              <span className="font-display font-semibold text-sm tracking-widest uppercase">Sayed Mohsin Ali</span>
              <span className="w-12 h-px bg-emerald/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-bold text-secondary-foreground mb-6">Get in Touch</h2>
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl bg-navy-light/40 border border-navy-light/60 hover:border-emerald/40 hover:shadow-glow transition-all duration-300 cursor-pointer"
                >
                  <item.icon className="h-6 w-6 text-emerald" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
