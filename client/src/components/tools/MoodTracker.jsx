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
  { value: "happy", label: "Happy", icon: <Smile className="h-8 w-8 text-green-500" />, color: "bg-green-100 hover:bg-green-200" },
  { value: "sad", label: "Sad", icon: <Smile className="h-8 w-8 text-blue-500" />, color: "bg-blue-100 hover:bg-blue-200" },
  { value: "neutral", label: "Neutral", icon: <Meh className="h-8 w-8 text-yellow-500" />, color: "bg-yellow-100 hover:bg-yellow-200" },
  { value: "anxious", label: "Anxious", icon: <Frown className="h-8 w-8 text-orange-500" />, color: "bg-orange-100 hover:bg-orange-200" },
  { value: "angry", label: "Angry", icon: <Frown className="h-8 w-8 text-red-500" />, color: "bg-red-100 hover:bg-red-200" },
];

const MoodTracker = ({ className }) => {
  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState([]);
  const { toast } = useToast();
  const [activityLevel, setActivityLevel] = useState("");
  const [sleepHours, setSleepHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood || !activityLevel || sleepHours === "" || sleepHours < 0) {
      toast({ title: "Incomplete Data", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/wellness/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ date: date.toISOString().split("T")[0], mood: selectedMood, notes, activity_level: activityLevel, sleep_hours: sleepHours }),
      });

      if (response.ok) {
        toast({ title: "Mood logged", description: "Your mood has been saved successfully" });
        setEntries((prev) => [...prev, { date, mood: selectedMood, notes, activity_level: activityLevel, sleep_hours: sleepHours }]);
        setSelectedMood(null); setNotes(""); setActivityLevel(""); setSleepHours("");
      } else {
        const errorData = await response.json();
        toast({ title: "Failed to save", description: errorData.detail || "Something went wrong.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Could not connect to server", variant: "destructive" });
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {/* Mood Card */}
      <Card className="md:col-span-2 border border-gray-200 rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">How are you feeling today?</CardTitle>
          <CardDescription className="text-gray-500">Track your mood to identify patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mood Selection */}
            <div>
              <Label className="mb-2 block text-gray-700 font-medium">Select your mood</Label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`${option.color} p-4 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105 ${selectedMood === option.value ? "ring-2 ring-indigo-500" : ""}`}
                    onClick={() => setSelectedMood(option.value)}
                  >
                    {option.icon}
                    <span className="mt-2 text-sm text-gray-800 font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="mb-2 block text-gray-700 font-medium">Notes (optional)</Label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-1 focus:ring-indigo-500 focus:outline-none text-gray-800"
                placeholder="What's contributing to your mood today?"
                rows={4}
              />
            </div>

            {/* Activity Level & Sleep Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activityLevel" className="mb-2 block text-gray-700 font-medium">Activity Level</Label>
                <select
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none text-gray-800"
                >
                  <option value="">Select activity</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <Label htmlFor="sleepHours" className="mb-2 block text-gray-700 font-medium">Sleep Hours</Label>
                <input
                  type="number"
                  id="sleepHours"
                  value={sleepHours !== null ? sleepHours : ""}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  min="0"
                  max="24"
                  step="0.5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none text-gray-800"
                  placeholder="Hours slept"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-black cursor-pointer text-white px-6 py-2 rounded-lg font-semibold">
                Save Entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Calendar Card */}
      <Card className="md:col-span-1 border border-gray-200 rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Calendar</CardTitle>
          <CardDescription className="text-gray-500">Select a date to log your mood</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar initialDate={date} onDateSelect={(selected) => selected && setDate(selected)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
