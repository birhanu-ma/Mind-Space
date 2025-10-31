import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import toolhead from "../assets/toolhead.png";
import MoodTracker from '../components/tools/MoodTracker';
import { ScrollArea } from '../components/ui/scroll-area';
import GuidedExercise from '../components/tools/GuidedExercise';
import ResourceDownload from '../components/tools/ResourceDownload';
import { SmilePlus, BookText, Headphones, FileDown, CheckCheck } from 'lucide-react';

const breathingExercise = {
  title: '4-7-8 Breathing Exercise',
  description: 'A simple breathing technique to reduce anxiety and help with sleep',
  durationMinutes: 5,
  instructions: [
    'Find a comfortable seated position or lie down.',
    'Place the tip of your tongue against the ridge behind your upper front teeth.',
    'Exhale completely through your mouth, making a whoosh sound.',
    'Close your mouth and inhale through your nose for a count of 4.',
    'Hold your breath for a count of 7.',
    'Exhale completely through your mouth for a count of 8.',
    'Repeat this cycle 3-4 more times.'
  ],
  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
};

const progressiveMuscleRelaxation = {
  title: 'Progressive Muscle Relaxation',
  description: 'Systematically tense and relax muscle groups to reduce physical tension',
  durationMinutes: 10,
  instructions: [
    'Sit in a comfortable position with your feet flat on the floor.',
    'Start with your feet. Curl your toes tightly for 5 seconds, then release.',
    'Move to your calves. Tense them for 5 seconds, then release.',
    'Continue with your thighs. Squeeze for 5 seconds, then release.',
    'Tense your abdomen for 5 seconds, then release.',
    'Make fists with both hands for 5 seconds, then release.',
    'Shrug your shoulders toward your ears for 5 seconds, then release.',
    'Scrunch your facial muscles for 5 seconds, then release.',
    'Notice the feeling of relaxation throughout your body.'
  ],
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
};

const mindfulnessExercise = {
  title: 'Five Senses Mindfulness',
  description: 'Ground yourself in the present moment using your five senses',
  durationMinutes: 7,
  instructions: [
    'Find a comfortable position and take a few deep breaths.',
    'Notice 5 things you can see around you. Observe their details.',
    'Notice 4 things you can touch or feel (texture of clothes, air on skin).',
    'Notice 3 things you can hear (both near and far sounds).',
    'Notice 2 things you can smell or like the smell of.',
    'Notice 1 thing you can taste or like the taste of.',
    'Take a deep breath and notice how present you feel in this moment.'
  ],
  image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
};

const gratitudeExercise = {
  title: 'Gratitude Practice',
  description: 'Focus on the positive aspects of your life to build resilience',
  durationMinutes: 5,
  instructions: [
    "Take a comfortable seated position with your back straight.",
    "Close your eyes and take a few deep breaths to center yourself.",
    "Think of three things you're grateful for today, no matter how small.",
    "For each thing, visualize it clearly in your mind.",
    "Notice how you feel as you hold each item in your awareness.",
    "When ready, take a deep breath and slowly open your eyes.",
    "Consider writing these down in a gratitude journal."
  ],
  image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
};

// Sample downloadable resources
const downloadableResources = [
  {
    title: 'Anxiety Management Workbook',
    description: 'A comprehensive guide with exercises to help manage anxiety symptoms',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    image: 'https://images.unsplash.com/photo-1485498128961-422168ba5f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Sleep Hygiene Checklist',
    description: 'Simple steps to improve your sleep quality and duration',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Stress Reduction Techniques',
    description: 'Audio recordings of guided stress reduction exercises',
    fileType: 'MP3',
    fileSize: '15.8 MB',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
  }
];

function Tool (){
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div>
        <div className="mindspace-container">    
          <div className="relative xl overflow-hidden mb-12">
            <img 
              src={toolhead} 
              alt="Self-care" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Take care of your mental health</h2>
                <p className="text-lg max-w-2xl mx-auto">Small steps every day can lead to significant improvements in your wellbeing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10"></div>
      <section className="bg-[#D0FFFF] w-full h-auto rounded-tl-[50px] rounded-tr-[50px] px-12 py-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Self-Help Tools</h1>
        <p className="text-lg md:text-xl max-w-3xl mb-6">
          Access practical tools designed to help you monitor and improve your mental wellbeing.
          These evidence-based resources can be used on your own or alongside professional support.
        </p>
      </section>

      <div className="pt-20 w-[1200px]"></div>
      <div className="flex items-center justify-center mb-12 px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="rounded-lg w-full h-[300px] p-8 text-center bg-[#D0FFFF] transform transition duration-300 hover:scale-110">
            <div className="flex flex-col items-center gap-2">
              <SmilePlus size={48} className="mx-auto mb-4 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p>Monitor your emotional wellbeing over time to identify patterns and triggers.</p>
          </div>
          <div className="rounded-lg w-full h-[300px] p-8 text-center bg-[#D0FFFF] transform transition duration-300 hover:scale-110">
            <div className="flex flex-col items-center gap-2">
              <Headphones size={48} className="mx-auto mb-4 text-green-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Guided Practices</h3>
            <p>Follow step-by-step exercises designed to reduce stress and improve wellbeing.</p>
          </div>
          <div className="rounded-lg w-full h-[300px] p-8 text-center bg-[#D0FFFF] transform transition duration-300 hover:scale-110">
            <div className="flex flex-col items-center gap-2">
              <FileDown size={48} className="mx-auto mb-4 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resources</h3>
            <p>Download worksheets, guides, and audio files to support your mental health journey.</p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="mindspace-container">
          <Tabs defaultValue="mood" className="w-full">
            <TabsList className="grid grid-cols-4 gap-10 mb-8">
              <TabsTrigger value="mood" className="flex items-center gap-2">
                <SmilePlus size={16} />
                <span className="hidden sm:inline">Mood Tracker</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookText size={16} />
                <span className="hidden sm:inline">Journaling</span>
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <Headphones size={16} />
                <span className="hidden sm:inline">Guided Exercises</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <FileDown size={16} />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mood" className="mt-0">
              <MoodTracker />
            </TabsContent>
            
            <TabsContent value="journal" className="mt-0">
              <div className="text-center py-12">
                <img 
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Journaling" 
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
                />
                <h3 className="text-2xl font-semibold mb-4">Journaling Feature Coming Soon</h3>
                <p className="text-gray-600 max-w-xl mx-auto">
                  We're working on a comprehensive journaling tool to help you express and process your thoughts and feelings. 
                  Journaling can help reduce stress, manage anxiety, and cope with depression.
                </p>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
                  <h4 className="font-medium mb-2">While you wait, try these journaling prompts:</h4>
                  <ul className="text-left space-y-2">
                    <li>• What are three things that went well today?</li>
                    <li>• What's something that challenged me today and how did I handle it?</li>
                    <li>• What am I looking forward to tomorrow?</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-0">
              <ScrollArea className="h-[800px] pr-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GuidedExercise {...breathingExercise} />
                  <GuidedExercise {...progressiveMuscleRelaxation} />
                  <GuidedExercise {...mindfulnessExercise} />
                  <GuidedExercise {...gratitudeExercise} />
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <div className="space-y-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Downloadable Resources</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Access worksheets, guides, and audio files to support your mental health journey. 
                    These resources have been developed by mental health professionals.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {downloadableResources.map((resource, index) => (
                    <ResourceDownload key={index} {...resource} />
                  ))}
                </div>
                
                <div className="bg-mindspace-blue/10 rounded-lg p-6 mt-12">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-1/3">
                      <img 
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                        alt="Support" 
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">Need personalized support?</h3>
                      <p className="mb-4">
                        While self-help tools can be beneficial, sometimes you might need additional support. 
                        Our community of professionals is here to help.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a href="/resources" className="btn-primary hover:bg-black hover:text-white rounded-lg px-4 py-2">Find Resources</a>
                        <a href="/community" className="btn-primary hover:bg-black hover:text-white rounded-lg px-4 py-2">Join Community</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    
      <section className="py-12 bg-[#D0FFFF]">
        <div className="mindspace-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Daily Mental Health Tips</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Incorporate these simple practices into your daily routine to support your mental wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
                  <CheckCheck size={20} className="text-blue-300" />
                </div>
                <h3 className="font-medium">Stay Active</h3>
              </div>
              <p className="text-sm text-gray-600">Even just a 10-minute walk can boost your mood and reduce stress levels.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
                  <CheckCheck size={20} className="text-blue-300" />
                </div>
                <h3 className="font-medium">Connect Daily</h3>
              </div>
              <p className="text-sm text-gray-600">Reach out to someone you care about. Social connection is vital for mental health.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
                  <CheckCheck size={20} className="text-blue-300" />
                </div>
                <h3 className="font-medium">Mindful Moments</h3>
              </div>
              <p className="text-sm text-gray-600">Take a few minutes each day to practice mindfulness and focus on the present.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
                  <CheckCheck size={20} className="text-blue-300" />
                </div>
                <h3 className="font-medium">Restful Sleep</h3>
              </div>
              <p className="text-sm text-gray-600">Prioritize good sleep habits. Quality sleep is essential for emotional regulation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tool;