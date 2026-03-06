import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Users, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Users, title: "AI Matching", desc: "Smart volunteer-opportunity pairing" },
  { icon: BookOpen, title: "Story Circles", desc: "Preserve life stories that matter" },
  { icon: Shield, title: "Kindness Radar", desc: "Never let anyone feel forgotten" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm mx-auto text-center"
        >
          <div className="w-20 h-20 katha-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-serif text-foreground mb-3">Katha</h1>
          <p className="text-lg text-muted-foreground mb-8">Every Story Matters</p>

          <Link to="/login">
            <Button className="w-full h-14 rounded-2xl katha-gradient text-primary-foreground font-semibold text-lg shadow-lg">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-6 pb-12">
        <div className="max-w-sm mx-auto space-y-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="katha-card flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
