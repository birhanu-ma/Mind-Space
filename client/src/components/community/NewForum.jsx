import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewForum() {
  const [header, setHeader] = useState('');
  const [paragraph, setParagraph] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ header, paragraph });
    alert(`Post Created!\nHeader: ${header}\nParagraph: ${paragraph}`);
    setHeader('');
    setParagraph('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[80%] mt-20 mb-10 mx-auto p-8 border border-gray-200 rounded-xl shadow-lg bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create New Forum</h2>

      <div className="mb-6">
        <label htmlFor="postHeader" className="block text-gray-700 font-medium mb-2">
          Header:
        </label>
        <input
          type="text"
          id="postHeader"
          className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="Enter post header"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="postParagraph" className="block text-gray-700 font-medium mb-2">
          Write your forum body:
        </label>
        <textarea
          id="postParagraph"
          className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          placeholder="Write your post content here..."
          rows="5"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
      >
        Submit Post
      </button>
    </form>
  );
}

export default NewForum;
