import { motion } from "framer-motion";
import { Globe, Target, Eye, Heart, Lightbulb, Users, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import developerImg from "@/assets/developer-profile.png";

const features = [
  { icon: Globe, title: "195+ Countries", desc: "Comprehensive data for every recognized nation" },
  { icon: BarChart3, title: "Real-Time Data", desc: "Live statistics from trusted global sources" },
  { icon: Shield, title: "Verified Sources", desc: "REST Countries API & UN data" },
  { icon: Users, title: "User-Centric", desc: "For researchers, students & explorers" },
];

const values = [
  { icon: Target, title: "Precision", desc: "Every data point verified" },
  { icon: Eye, title: "Transparency", desc: "Open data, clear sources" },
  { icon: Heart, title: "Passion", desc: "Built with love for geography" },
  { icon: Lightbulb, title: "Innovation", desc: "Modern tech for timeless knowledge" },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
            About <span className="text-gradient-gold">KingLand</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your gateway to genuine global knowledge — authentic, real, and deeply reliable.
          </p>
        </motion.div>

        {/* Features Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-card border border-border p-6 sm:p-8 mb-8 shadow-lg"
        >
          <h2 className="font-display text-xl font-bold mb-6">
            What We <span className="text-gradient-emerald">Offer</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, x: 4 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border hover:border-emerald/40 hover:shadow-glow transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-emerald/10 shrink-0">
                  <f.icon className="h-5 w-5 text-emerald" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-card border border-border p-6 sm:p-8 mb-8 shadow-lg"
        >
          <h2 className="font-display text-xl font-bold mb-6">
            Our <span className="text-gradient-gold">Values</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="text-center p-4 rounded-xl bg-muted/20 border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300"
              >
                <v.icon className="h-7 w-7 text-gold mx-auto mb-3" />
                <h3 className="font-display font-bold text-sm">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative shrink-0"
            >
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald to-gold opacity-40 blur-md"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <img
                src={developerImg}
                alt="Sayed Mohsin Ali"
                className="relative w-20 h-20 rounded-full object-cover border-2 border-border"
              />
            </motion.div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="font-display text-xl font-bold mb-1">Meet the Developer</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Built with ❤️ by <span className="text-emerald font-medium">Sayed Mohsin Ali</span> — Systems Developer
              </p>
              <Link
                to="/developer"
                className="inline-flex items-center gap-2 gradient-accent text-primary-foreground font-semibold px-6 py-2.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity text-sm"
              >
                View Profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
