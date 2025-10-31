import React, { useState } from "react";
import Calendar from "../ui/calander";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Smile, Meh, Frown } from "lucide-react";
import { Button } from "../ui/button";

const moodOptions = [
  {
    value: "happy",
    label: "happy",
    icon: <Smile className="h-8 w-8 text-green-500" />,
    color: "bg-green-100 hover:bg-green-200",
  },
  {
    value: "sad",
    label: "sad",
    icon: <Smile className="h-8 w-8 text-blue-500" />,
    color: "bg-blue-100 hover:bg-blue-200",
  },
  {
    value: "neutral",
    label: "neutral",
    icon: <Meh className="h-8 w-8 text-yellow-500" />,
    color: "bg-yellow-100 hover:bg-yellow-200",
  },
  {
    value: "anxious",
    label: "anxious",
    icon: <Frown className="h-8 w-8 text-orange-500" />,
    color: "bg-orange-100 hover:bg-orange-200",
  },
  {
    value: "angry",
    label: "angry",
    icon: <Frown className="h-8 w-8 text-red-500" />,
    color: "bg-red-100 hover:bg-red-200",
  },
];

const MoodTracker = ({ className }) => {
  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState([]);
  const { toast } = useToast();
  const [activityLevel, setActivityLevel] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMood) {
      toast({
        title: "Mood required",
        description: "Please select a mood before saving",
        variant: "destructive",
      });
      return;
    }

    if (!activityLevel) {
      toast({
        title: "Activity Level required",
        description: "Please enter your activity level.",
        variant: "destructive",
      });
      return;
    }

    if (sleepHours === null || sleepHours === undefined || sleepHours < 0) {
      toast({
        title: "Sleep Hours required",
        description: "Please enter the number of hours you slept.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/wellness/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Auth header
        },
        body: JSON.stringify({
          date: date.toISOString().split("T")[0],
          mood: selectedMood,
          notes: notes,
          activity_level: activityLevel,
          sleep_hours: sleepHours,
        }),
      });

      if (response.ok) {
        toast({
          title: "Mood logged",
          description: "Your mood has been saved successfully",
        });

        const newEntry = {
          date: new Date(date),
          mood: selectedMood,
          notes: notes,
          activity_level: activityLevel,
          sleep_hours: sleepHours,
        };

        setEntries((prev) => [...prev, newEntry]);
        setSelectedMood(null);
        setNotes("");
        setActivityLevel("");
        setSleepHours(0);
      } else {
        const errorData = await response.json();
        console.error("Failed to save mood:", errorData);
        toast({
          title: "Failed to save",
          description: errorData.detail || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error posting mood:", error);
      toast({
        title: "Error",
        description: "Could not connect to server",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {/* Mood Tracking Card */}
      <Card className="md:col-span-2 shadow-lg shadow-gray-500 border border-gray-300 p-4">
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            Track your mood to identify patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label className="mb-2 block">Select your mood</Label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`${option.color} ${
                      selectedMood === option.value
                        ? "ring-2 ring-mindspace-blue"
                        : ""
                    } p-4 rounded-lg flex flex-col items-center transition-all`}
                    onClick={() => setSelectedMood(option.value)}
                  >
                    {option.icon}
                    <span className="mt-2 text-xs text-black">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="notes" className="mb-2 block">
                Notes (optional)
              </Label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border rounded-lg h-24"
                placeholder="What's contributing to your mood today?"
              />
            </div>
            <div>
              <Label htmlFor="activityLevel" className="mb-2 block">
                Activity Level
              </Label>
              <select
                id="activityLevel"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="low">low</option>
                <option value="moderate">moderate</option>
                <option value="high">high</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sleepHours" className="mb-2 block">
                Sleep Hours
              </Label>
              <input
                type="number"
                id="sleepHours"
                value={sleepHours !== null ? sleepHours : ""}
                onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                className="w-full p-3 border rounded-lg"
                min="0"
                max="24"
                step="0.5" // Allow half hours if needed
              />
            </div>

            <div className="flex  justify-end">
              <Button type="submit" variant="default"
              className = "cursor-pointer">
                Save Entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Calendar Card */}
      <Card className="md:col-span-1 shadow-lg shadow-gray-500 border border-gray-300 flex-grow">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to log your mood</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            initialDate={date}
            onDateSelect={(selected) => {
              if (selected) setDate(selected);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
