import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Pause, Play, RotateCcw } from 'lucide-react';

const GuidedExercise = ({ title, description, durationMinutes, instructions, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60);
  
  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    let interval;
    
    if (isPlaying && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeRemaining]);
  
  // Auto progress steps based on time
  useEffect(() => {
    if (isPlaying && instructions.length > 1) {
      const stepTime = (durationMinutes * 60) / instructions.length;
      const currentStepIndex = instructions.length - 1 - Math.floor(timeRemaining / stepTime);
      
      if (currentStepIndex >= 0 && currentStepIndex < instructions.length && currentStepIndex !== currentStep) {
        setCurrentStep(currentStepIndex);
      }
    }
  }, [timeRemaining, isPlaying, instructions.length, durationMinutes, currentStep]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTimeRemaining(durationMinutes * 60);
  };
  
  // Move to next step
  const nextStep = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Calculate progress percentage
  const progress = (currentStep / (instructions.length - 1)) * 100;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono">{formatTime(timeRemaining)}</div>
            <div className="text-xs text-gray-500">{durationMinutes} min exercise</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative h-2 bg-gray-200 rounded-full mb-6">
          <div 
            className="absolute top-0 left-0 h-full bg-mindspace-blue rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className={`bg-gray-50 p-4 rounded-lg mb-4 transition-all ${isPlaying ? 'border-l-4 border-mindspace-coral' : ''}`}>
          <p className="font-medium mb-1">Step {currentStep + 1} of {instructions.length}</p>
          <p>{instructions[currentStep]}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            onClick={nextStep}
            disabled={currentStep >= instructions.length - 1}
          >
            Next Step
          </Button>
          
          <Button 
            className={isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} 
            onClick={togglePlay}
          >
            {isPlaying ? (
              <><Pause className="mr-2 h-4 w-4" /> Pause</>
            ) : (
              <><Play className="mr-2 h-4 w-4" /> Start</>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GuidedExercise;
