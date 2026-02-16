import { motion } from "framer-motion";
import { Globe, Target, Eye, Heart, Lightbulb, Users, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Globe, title: "195+ Countries", desc: "Comprehensive data for every recognized nation" },
  { icon: BarChart3, title: "Real-Time Data", desc: "Live statistics from trusted global sources" },
  { icon: Shield, title: "Verified Sources", desc: "REST Countries API, UN & World Bank data" },
  { icon: Users, title: "User-Centric", desc: "Designed for researchers, students & explorers" },
];

const values = [
  { icon: Target, title: "Precision", desc: "Every data point is verified and accurate" },
  { icon: Eye, title: "Transparency", desc: "Open data, clear sources, no hidden agendas" },
  { icon: Heart, title: "Passion", desc: "Built with love for geography and cultures" },
  { icon: Lightbulb, title: "Innovation", desc: "Modern tech for timeless knowledge" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="relative gradient-hero py-24 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="text-secondary-foreground">About </span>
              <span className="text-gradient-gold">KingLand</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your gateway to genuine global knowledge. We bring the world's data to your fingertips — authentic, real, and 1000% reliable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground mb-4">
              Our <span className="text-gradient-emerald">Mission</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              KingLand was born from a simple idea: everyone deserves access to accurate, beautifully presented country data. No paywalls, no propaganda — just pure, verified knowledge about every nation on Earth.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -6 }}
                className="group p-6 rounded-xl bg-navy-light/40 border border-navy-light/60 hover:border-emerald/40 hover:shadow-glow transition-all duration-300 text-center"
              >
                <div className="p-3 rounded-lg bg-emerald/10 inline-block mb-4 group-hover:bg-emerald/20 transition-colors">
                  <f.icon className="h-7 w-7 text-emerald" />
                </div>
                <h3 className="font-display font-bold text-lg text-secondary-foreground mb-2 group-hover:text-emerald transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={itemVariants}
                whileHover={{ rotateY: 10, scale: 1.03 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300 text-center"
              >
                <v.icon className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-bold text-secondary-foreground mb-3">
              Meet the Developer
            </h2>
            <p className="text-muted-foreground mb-6">Built with ❤️ by Sayed Mohsin Ali</p>
            <Link
              to="/developer"
              className="inline-flex items-center gap-2 gradient-accent text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
            >
              View Developer Profile
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
