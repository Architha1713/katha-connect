import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Mic, Camera, PenLine, Heart } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const typeIcon: Record<string, any> = { text: PenLine, audio: Mic, video: Camera };

const StoryCircles = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchStories = async () => {
    const { data } = await supabase.from("stories").select("*, profiles:author_id(full_name)").order("created_at", { ascending: false });
    setStories(data ?? []);
  };

  useEffect(() => { fetchStories(); }, []);

  const createStory = async () => {
    if (!user || !title) return;
    setSaving(true);
    const { error } = await supabase.from("stories").insert({ author_id: user.id, title, content, media_type: "text" });
    setSaving(false);
    if (error) { toast.error("Failed to save story"); return; }
    toast.success("Story published!");
    setOpen(false); setTitle(""); setContent("");
    fetchStories();
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold font-serif text-foreground">Story Circles</h1>
            <p className="text-sm text-muted-foreground">Every story matters</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="w-10 h-10 rounded-xl katha-gradient flex items-center justify-center"><PenLine className="w-5 h-5 text-primary-foreground" /></button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Write a Story</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Story title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Tell the story..." value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
                <Button onClick={createStory} disabled={saving} className="w-full katha-gradient text-primary-foreground">{saving ? "Saving..." : "Publish Story"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {stories.length === 0 ? (
          <div className="katha-card text-center py-12"><p className="text-muted-foreground">No stories yet. Be the first to share!</p></div>
        ) : (
          <div className="space-y-3">
            {stories.map((story, i) => {
              const Icon = typeIcon[story.media_type || "text"] || BookOpen;
              const authorName = story.profiles?.full_name || "Anonymous";
              return (
                <motion.div key={story.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="katha-card">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full katha-gradient-warm flex items-center justify-center text-lg font-bold text-primary-foreground flex-shrink-0">{authorName[0]}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-foreground">{story.title}</h3>
                      <p className="text-xs text-muted-foreground">by {authorName}</p>
                      {story.content && <p className="text-sm text-foreground/80 mt-2 line-clamp-3">{story.content}</p>}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                        <Icon className="w-3 h-3" />
                        <span>{story.media_type || "text"}</span>
                        <span>· {new Date(story.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StoryCircles;
