import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import toolhead from "../assets/toolhead.png";
import MoodTracker from "../components/tools/MoodTracker";
import { ScrollArea } from "../components/ui/scroll-area";
import GuidedExercise from "../components/tools/GuidedExercise";
import ResourceDownload from "../components/tools/ResourceDownload";
import {
  SmilePlus,
  BookText,
  Headphones,
  FileDown,
  CheckCheck,
  ChevronDown
} from "lucide-react";

// --- Data objects preserved exactly ---
const breathingExercise = {
  title: "4-7-8 Breathing Exercise",
  description: "A simple breathing technique to reduce anxiety and help with sleep",
  durationMinutes: 5,
  instructions: [
    "Find a comfortable seated position or lie down.",
    "Place the tip of your tongue against the ridge behind your upper front teeth.",
    "Exhale completely through your mouth, making a whoosh sound.",
    "Close your mouth and inhale through your nose for a count of 4.",
    "Hold your breath for a count of 7.",
    "Exhale completely through your mouth for a count of 8.",
    "Repeat this cycle 3-4 more times.",
  ],
  image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
};

const progressiveMuscleRelaxation = {
  title: "Progressive Muscle Relaxation",
  description: "Systematically tense and relax muscle groups to reduce physical tension",
  durationMinutes: 10,
  instructions: [
    "Sit in a comfortable position with your feet flat on the floor.",
    "Start with your feet. Curl your toes tightly for 5 seconds, then release.",
    "Move to your calves. Tense them for 5 seconds, then release.",
    "Continue with your thighs. Squeeze for 5 seconds, then release.",
    "Tense your abdomen for 5 seconds, then release.",
    "Make fists with both hands for 5 seconds, then release.",
    "Shrug your shoulders toward your ears for 5 seconds, then release.",
    "Scrunch your facial muscles for 5 seconds, then release.",
    "Notice the feeling of relaxation throughout your body.",
  ],
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
};

const mindfulnessExercise = {
  title: "Five Senses Mindfulness",
  description: "Ground yourself in the present moment using your five senses",
  durationMinutes: 7,
  instructions: [
    "Find a comfortable position and take a few deep breaths.",
    "Notice 5 things you can see around you. Observe their details.",
    "Notice 4 things you can touch or feel (texture of clothes, air on skin).",
    "Notice 3 things you can hear (both near and far sounds).",
    "Notice 2 things you can smell or like the smell of.",
    "Notice 1 thing you can taste or like the taste of.",
    "Take a deep breath and notice how present you feel in this moment.",
  ],
  image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
};

const gratitudeExercise = {
  title: "Gratitude Practice",
  description: "Focus on the positive aspects of your life to build resilience",
  durationMinutes: 5,
  instructions: [
    "Take a comfortable seated position with your back straight.",
    "Close your eyes and take a few deep breaths to center yourself.",
    "Think of three things you're grateful for today, no matter how small.",
    "For each thing, visualize it clearly in your mind.",
    "Notice how you feel as you hold each item in your awareness.",
    "When ready, take a deep breath and slowly open your eyes.",
    "Consider writing these down in a gratitude journal.",
  ],
  image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
};

const downloadableResources = [
  {
    title: "Anxiety Management Workbook",
    description: "A comprehensive guide with exercises to help manage anxiety symptoms",
    fileType: "PDF",
    fileSize: "2.4 MB",
    image: "https://images.unsplash.com/photo-1485498128961-422168ba5f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Sleep Hygiene Checklist",
    description: "Simple steps to improve your sleep quality and duration",
    fileType: "PDF",
    fileSize: "1.2 MB",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Stress Reduction Techniques",
    description: "Audio recordings of guided stress reduction exercises",
    fileType: "MP3",
    fileSize: "15.8 MB",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
];

function Tool() {
  return (
    <div className="flex flex-col w-full bg-white text-gray-900 font-sans">
      
      {/* Hero Section - Set to min-h-screen to cover entire viewport */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={toolhead}
          alt="Self-care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            Take Care of Your <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-200">
                Mental Health
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            Every journey begins with a single step. Discover tools to help you find your balance.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white opacity-70"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Intro Section - Now overlaps naturally */}
      <section className="relative z-20 bg-white px-6 sm:px-12 py-24 mx-auto max-w-7xl rounded-t-[3rem] -mt-16 shadow-2xl">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter">
            Self-Help Toolkit
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
            Access practical tools designed to help you monitor and improve your mental wellbeing. 
            These evidence-based resources can be used on your own or alongside professional support.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: SmilePlus, color: "text-blue-500", bg: "bg-blue-50", title: "Track Progress", desc: "Monitor your emotional wellbeing over time to identify patterns and triggers." },
            { icon: Headphones, color: "text-emerald-500", bg: "bg-emerald-50", title: "Guided Practices", desc: "Follow step-by-step exercises designed to reduce stress and improve wellbeing." },
            { icon: FileDown, color: "text-rose-500", bg: "bg-rose-50", title: "Resources", desc: "Download worksheets, guides, and audio files to support your mental health journey." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center"
            >
              <div className={`${item.bg} ${item.color} p-5 rounded-2xl mb-6`}>
                <item.icon size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tabs / Tools Content */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <Tabs defaultValue="mood" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-gray-50 rounded-2xl mb-16 h-auto">
            {[
              { value: "mood", label: "Mood Tracker", icon: SmilePlus },
              { value: "journal", label: "Journaling", icon: BookText },
              { value: "exercises", label: "Guided Exercises", icon: Headphones },
              { value: "resources", label: "Resources", icon: FileDown },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-gray-500 transition-all
                data-[state=active]:bg-black data-[state=active]:text-white shadow-sm"
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="mood">
            <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-100">
              <MoodTracker />
            </div>
          </TabsContent>

          <TabsContent value="journal">
            <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100">
              <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3" 
                   className="w-48 h-48 object-cover rounded-full mx-auto mb-8 shadow-2xl" alt="Journal" />
              <h3 className="text-4xl font-black mb-4">Coming Soon</h3>
              <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">
                A private, encrypted space for your daily reflections.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <ScrollArea className="h-[700px] pr-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GuidedExercise {...breathingExercise} />
                <GuidedExercise {...progressiveMuscleRelaxation} />
                <GuidedExercise {...mindfulnessExercise} />
                <GuidedExercise {...gratitudeExercise} />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {downloadableResources.map((resource, idx) => (
                <ResourceDownload key={idx} {...resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Daily Tips Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter">Daily Rituals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Stay Active", desc: "A short walk boosts mood and reduces cortisol." },
              { title: "Connect Daily", desc: "Meaningful conversation is a mental health cornerstone." },
              { title: "Mindful Moments", desc: "Take five deep breaths whenever you feel rushed." },
              { title: "Restful Sleep", desc: "Prioritize sleep hygiene for emotional regulation." },
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <CheckCheck className="text-blue-500 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tool;