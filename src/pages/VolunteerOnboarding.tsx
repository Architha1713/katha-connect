import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, ChevronRight } from "lucide-react";

const causes = [
  "Elder Companionship",
  "Child Education",
  "Mentoring Youth",
  "Rehabilitation Support",
  "Orphanage Assistance",
  "Disaster Relief",
  "Community Health",
  "Environmental Action",
];

const skills = ["Teaching", "Counseling", "Medical", "Tech", "Creative Arts", "Sports", "Music", "Cooking"];
const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi"];

const VolunteerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const steps = [
    {
      title: "Your Profile",
      content: (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <Input placeholder="Full Name" className="h-12 rounded-xl bg-card" />
          <Input placeholder="Location (City)" className="h-12 rounded-xl bg-card" />
          <Input placeholder="Weekly hours available" type="number" className="h-12 rounded-xl bg-card" />
        </div>
      ),
    },
    {
      title: "Your Skills",
      content: (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <button
              key={s}
              onClick={() => toggleItem(s, selectedSkills, setSelectedSkills)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSkills.includes(s)
                  ? "katha-gradient text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Languages",
      content: (
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => toggleItem(l, selectedLanguages, setSelectedLanguages)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguages.includes(l)
                  ? "katha-gradient text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Causes You Care About",
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {causes.map((c) => (
              <button
                key={c}
                onClick={() => toggleItem(c, selectedCauses, setSelectedCauses)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCauses.includes(c)
                    ? "katha-gradient text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="katha-card flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Active Volunteer</p>
              <p className="text-xs text-muted-foreground">AI will match you with opportunities</p>
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-12 h-7 rounded-full transition-colors relative ${isActive ? "katha-gradient" : "bg-muted"}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-1 transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-sm mx-auto"
      >
        <div className="flex gap-1 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "katha-gradient" : "bg-muted"}`}
            />
          ))}
        </div>

        <h1 className="text-2xl font-bold font-serif text-foreground mb-6">{steps[step].title}</h1>
        {steps[step].content}

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 h-12 rounded-xl">
              Back
            </Button>
          )}
          <Button
            onClick={() => (step < steps.length - 1 ? setStep(step + 1) : navigate("/dashboard"))}
            className="flex-1 h-12 rounded-xl katha-gradient text-primary-foreground font-semibold"
          >
            {step < steps.length - 1 ? (
              <>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default VolunteerOnboarding;
