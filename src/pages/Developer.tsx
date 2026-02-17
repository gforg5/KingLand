import { motion } from "framer-motion";
import { Code2, Terminal, Globe2, Cpu, Shield, Rocket, MapPin, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import developerImg from "@/assets/developer-profile.png";

const skills = [
  { icon: Code2, label: "Full-Stack Dev", desc: "React · TypeScript · Node.js" },
  { icon: Terminal, label: "Systems Architecture", desc: "Scalable & maintainable" },
  { icon: Globe2, label: "Web Technologies", desc: "Modern frameworks & APIs" },
  { icon: Cpu, label: "Cloud & DevOps", desc: "AWS · Docker · CI/CD" },
  { icon: Shield, label: "Security First", desc: "Secure by design" },
  { icon: Rocket, label: "Performance", desc: "Optimized for speed" },
];

export default function Developer() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Developer Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-xl"
        >
          {/* Animated gradient border glow */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-emerald via-gold to-emerald opacity-20 blur-sm -z-10"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          {/* Top gradient banner with BIG bubbles */}
          <div className="h-32 sm:h-40 gradient-hero relative overflow-hidden">
            {/* Big animated bubbles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-emerald/20"
                style={{
                  width: 40 + i * 30,
                  height: 40 + i * 30,
                  left: `${10 + i * 11}%`,
                  bottom: -20 - i * 5,
                  background: `radial-gradient(circle, hsl(var(--emerald) / ${0.06 + i * 0.02}), transparent 70%)`,
                }}
                animate={{
                  y: [0, -(60 + i * 20), 0],
                  x: [0, (i % 2 === 0 ? 15 : -15), 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Profile section */}
          <div className="px-6 sm:px-10 pb-8 -mt-16 relative">
            {/* Profile image with glow ring */}
            <motion.div
              className="relative inline-block mb-6"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald to-gold opacity-60 blur-md"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <img
                src={developerImg}
                alt="Sayed Mohsin Ali"
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-card shadow-glow"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald/10 border border-emerald/20 px-3 py-1 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-medium text-emerald">Systems Developer</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-1">
                <span className="text-foreground">Sayed </span>
                <span className="text-gradient-gold">Mohsin Ali</span>
              </h1>

              <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
                <MapPin className="h-3.5 w-3.5 text-emerald" />
                <span className="text-sm">Pakhtunistan, Khyber Pakhtunkhwa</span>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-xl mb-6">
                Systems Developer passionate about building high-performance, scalable applications. Crafting digital experiences with precision and purpose.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 mb-8">
                {[
                  { icon: Github, label: "GitHub" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Mail, label: "Email" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg bg-muted/50 border border-border hover:border-emerald/40 hover:shadow-glow transition-all duration-300 cursor-pointer"
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground hover:text-emerald transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-border mb-6" />

            {/* Skills grid */}
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Technical Expertise
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="group p-4 rounded-xl bg-muted/30 border border-border hover:border-emerald/40 hover:shadow-glow transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-emerald/10 inline-block mb-2 group-hover:bg-emerald/20 transition-colors">
                    <skill.icon className="h-4 w-4 text-emerald" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-foreground group-hover:text-emerald transition-colors">
                    {skill.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{skill.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-5 rounded-xl bg-muted/20 border border-border/50 text-center"
            >
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "I believe in writing code that is not just functional, but elegant. Clean architecture isn't just a preference — it's a standard."
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-emerald">
                <span className="w-8 h-px bg-emerald/40" />
                <span className="font-display font-semibold text-xs tracking-widest uppercase">SMA</span>
                <span className="w-8 h-px bg-emerald/40" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
