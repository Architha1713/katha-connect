import { motion } from "framer-motion";
import { BookOpen, Mic, Camera, PenLine, Heart } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const stories = [
  {
    title: "My Childhood in a Village",
    author: "Lakshmi",
    age: 78,
    excerpt: "I grew up in a small village near Mysuru. Every morning, I would walk to the river with my grandmother...",
    type: "written",
    date: "Feb 28, 2026",
    likes: 24,
  },
  {
    title: "Learning to Read Again",
    author: "Ravi",
    age: 34,
    excerpt: "After my accident, I thought I would never be able to read. But with the help of volunteers at the centre...",
    type: "audio",
    date: "Feb 20, 2026",
    likes: 18,
  },
  {
    title: "Dreams of Becoming a Doctor",
    author: "Ananya",
    age: 12,
    excerpt: "When I grow up, I want to help people like the volunteers help me. I want to become a doctor...",
    type: "written",
    date: "Feb 15, 2026",
    likes: 32,
  },
];

const typeIcon = {
  written: PenLine,
  audio: Mic,
  video: Camera,
};

const StoryCircles = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold font-serif text-foreground">Story Circles</h1>
            <p className="text-sm text-muted-foreground">Every story matters</p>
          </div>
          <button className="w-10 h-10 rounded-xl katha-gradient flex items-center justify-center">
            <PenLine className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Record options */}
        <div className="flex gap-2 mb-6">
          {[
            { icon: PenLine, label: "Write" },
            { icon: Mic, label: "Record" },
            { icon: Camera, label: "Photo" },
          ].map((opt) => (
            <button key={opt.label} className="flex-1 katha-card flex flex-col items-center gap-1 py-3">
              <opt.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Stories */}
        <div className="space-y-3">
          {stories.map((story, i) => {
            const Icon = typeIcon[story.type as keyof typeof typeIcon] || BookOpen;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="katha-card"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full katha-gradient-warm flex items-center justify-center text-lg font-bold text-primary-foreground flex-shrink-0">
                    {story.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-foreground">{story.title}</h3>
                    <p className="text-xs text-muted-foreground">by {story.author} (Age {story.age})</p>
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-2">{story.excerpt}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon className="w-3 h-3" />
                        <span>{story.type}</span>
                        <span>· {story.date}</span>
                      </div>
                      <button className="flex items-center gap-1 text-xs text-katha-rose">
                        <Heart className="w-3 h-3" /> {story.likes}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default StoryCircles;
