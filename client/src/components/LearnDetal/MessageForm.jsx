import React from 'react'

function MessageForm() {
  return (
    <div>
         <form
          className="flex flex-col h-full mt-15  md:ml-10 sm:h-130 sm:mx-10 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        >
          <div className="w-full flex flex-col items-center sm:h-100 sm:mt-10">
            <input
              className="h-10 w-[80%] border rounded pl-3 my-2"
              type="text"
              name="name"
              placeholder="your name"
              required
            />
            <input
              className="h-10 w-[80%] border rounded pl-3 my-2"
              type="email"
              name="email"
             
              placeholder="your email"
              required
            />
            <input
              className="h-10 w-[80%] border rounded pl-3 my-2"
              name="subject"
           
              type="text"
              placeholder="your subject"
              required
            />
            <textarea
              className="w-[80%] h-30 border rounded pl-3 sm:h-40 my-2 mb-7"
              name="message"
          
              placeholder="your message"
              required
            ></textarea>


            <div className="w-full flex justify-center">
              <button
                className="w-[50%] h-10 cursor-pointer rounded-full bg-black text-white mb-10 disabled:bg-gray-400"
                type="submit"
              >
               send message
              </button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default MessageForm