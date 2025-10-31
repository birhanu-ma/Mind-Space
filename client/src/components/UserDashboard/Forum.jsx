import React, { useState } from "react";

function Forum() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem('accessToken'); // This line is correct

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/forum/${topic}/posts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // FIX 1: Correctly set the Authorization header
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            topic: topic,
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data); // Add a success log
        // You might want to clear the form or provide user feedback here
        setTopic("");
        setContent("");
      } else {
        // Log the actual error response from the server for better debugging
        const errorData = await response.json();
        console.error("Error creating post:", response.status, errorData);
        // Provide user feedback about the specific error
        alert(`Failed to create post: ${errorData.detail || JSON.stringify(errorData)}`);
      }
    } catch (error) { // FIX 2: Define 'error' in the catch block
      console.error("Network or unexpected error:", error);
      alert("Could not connect to the server or an unexpected error occurred.");
    }
  };

  function handleTopic(e) {
    setTopic(e.target.value);
  }
  function handleContent(e) {
    setContent(e.target.value);
  }

  return (
    <div className="sm:absolute shadow-sm sm:top-5 sm:right-0 mt-5 sm:mt-0 w-full sm:w-[58%] sm:h-[90vh] mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Forum</h1>
        <p className="text-gray-600">This is the forum section.</p>
      </div>
      <form onSubmit={handleSubmit} className="m-5">
        <div>
          <input
            type="text"
            value={topic}
            placeholder="Enter your topic here"
            className="w-full h-10 p-4 border rounded-lg mb-5 focus:outline-none"
            onChange={handleTopic}
          />
        </div>
        <div>
          <textarea
            name="content"
            type="text"
            value={content}
            id=""
            className="w-full h-40 p-4 border rounded-lg mb-5 focus:outline-none"
            placeholder="Write your content here"
            onChange={handleContent}
          ></textarea>
        </div>
        <div className="flex h-10  justify-center   items-center">
          <button type="submit" className=" cursor-pointer py-2 rounded-full bg-blue-500 w-30">
            Create Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Forum;