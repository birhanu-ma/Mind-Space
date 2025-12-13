import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Pause, Play, RotateCcw } from 'lucide-react';

const GuidedExercise = ({ title, description, durationMinutes, instructions, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  useEffect(() => {
    if (isPlaying && instructions.length > 1) {
      const stepTime = (durationMinutes * 60) / instructions.length;
      const currentStepIndex = instructions.length - 1 - Math.floor(timeRemaining / stepTime);
      if (currentStepIndex >= 0 && currentStepIndex < instructions.length && currentStepIndex !== currentStep) {
        setCurrentStep(currentStepIndex);
      }
    }
  }, [timeRemaining, isPlaying, instructions.length, durationMinutes, currentStep]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => { setIsPlaying(false); setCurrentStep(0); setTimeRemaining(durationMinutes * 60); };
  const nextStep = () => { if (currentStep < instructions.length - 1) setCurrentStep(currentStep + 1); };
  const progress = (currentStep / (instructions.length - 1)) * 100;

  return (
    <Card className="overflow-hidden border border-gray-200 rounded-2xl bg-white transition-all hover:shadow-lg">
      {image && (
        <div className="h-48 w-full overflow-hidden rounded-t-2xl">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <CardHeader className="px-6 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">{title}</CardTitle>
            <CardDescription className="text-gray-500">{description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-gray-700">{formatTime(timeRemaining)}</div>
            <div className="text-xs text-gray-400">{durationMinutes} min exercise</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 rounded-full mb-6">
          <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Current Step */}
        <div className={`bg-gray-50 p-4 rounded-lg mb-4 border-l-4 ${isPlaying ? 'border-indigo-500' : 'border-gray-200'} transition-colors`}>
          <p className="font-semibold text-gray-700 mb-1">Step {currentStep + 1} of {instructions.length}</p>
          <p className="text-gray-600">{instructions[currentStep]}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-6 py-4">
        <Button variant="outline" className="rounded-lg" onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>

        <div className="flex gap-2">
          <Button variant="secondary" className="rounded-lg" onClick={nextStep} disabled={currentStep >= instructions.length - 1}>
            Next Step
          </Button>

          <Button className={`rounded-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`} onClick={togglePlay}>
            {isPlaying ? <><Pause className="mr-2 h-4 w-4" /> Pause</> : <><Play className="mr-2 h-4 w-4" /> Start</>}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GuidedExercise;
