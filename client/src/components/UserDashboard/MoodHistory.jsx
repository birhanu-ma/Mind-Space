import React, { useState, useEffect } from "react";

function MoodHistory() {
  const [moodSet, setMoodSet] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/wellness/", {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMoodSet(data))
      .catch((error) => console.error(error));
  }, []); 
  console.log(moodSet);

  return (
    <div className="sm:absolute sm:top-5 right-0 sm:w-[58%] overflow-y-auto w-full h-[90vh] mx-auto">
      <div className="rounded text-start py-5 my-3 mx-15">
        <h1>your mood history</h1>
        {moodSet.map((moods) => (
          <div
            key={moods.id}
            className="grid grid-cols-2 gap-x-6 gap-y-4 p-4 border rounded-md shadow-md my-4"
          >
            <div className="flex items-center">
              <label htmlFor="time" className="font-semibold w-24">
                Date
              </label>
              <p id="time" className="text-gray-700">
                {moods.timestamp}
              </p>
            </div>

            <div className="flex items-center">
              <label htmlFor="feeling" className="font-semibold w-24">
                Feeling
              </label>
              <p id="feeling" className="text-gray-700">
                {moods.mood}
              </p>
            </div>

            <div className="flex items-center">
              <label htmlFor="activity" className="font-semibold w-24">
                Sleep Hours
              </label>
              <p id="activity" className="text-gray-700">
                {moods.sleep_hours}
              </p>
            </div>

            <div className="flex items-center">
              <label htmlFor="level" className="font-semibold w-24">
                Activity Level
              </label>
              <p id="level" className="text-gray-700">
                {moods.activity_level}
              </p>
            </div>

            <div className="col-span-2 flex flex-col">
              <label htmlFor="notes" className="font-semibold mb-1">
                Notes
              </label>
              <p id="notes" className="text-gray-700">
                {moods.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodHistory;
