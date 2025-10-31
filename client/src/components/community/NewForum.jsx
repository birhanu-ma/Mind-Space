import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewForum() {
  const [header, setHeader] = useState('');
  const [paragraph, setParagraph] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, you would handle the form submission here,
    // for example, by sending the data to an API.
    console.log({ header, paragraph });
    alert(`Post Created!\nHeader: ${header}\nParagraph: ${paragraph}`);
    setHeader('');
    setParagraph('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-[80%] mt-20 mb-10  mx-auto p-6 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New forum</h2>

      <div className="mb-4">
        <label htmlFor="postHeader" className="block text-gray-700 text-sm font-bold mb-2">
          Header:
        </label>
        <input
          type="text"
          id="postHeader"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="Enter post header"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="postParagraph" className="block text-gray-700 text-sm font-bold mb-2">
          write your forum body 
        </label>
        <textarea
          id="postParagraph"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          placeholder="Write your post content here..."
          rows="5"
          required
        />
      </div>
      <Link to = {`/community/newform`}>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Post
      </button>

      </Link>

      
    </form>
  );
}

export default NewForum;