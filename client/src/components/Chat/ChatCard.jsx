import React from 'react';
import ChatCardLeft from './ChatCardLeft';
import ChatCardRight from './ChatCardRight';
import MessageForm from './MessageForm';
import SideBar from './SideBar';

function ChatCard() {
  return (
    <div className='flex flex-row'>
   
      <div className='sm:w-[70%]'>
        <div className='space-y-4 p-4 sm:pr-0'>
          <ChatCardRight />
          <ChatCardRight />
          <ChatCardRight />
          <ChatCardLeft />
          <MessageForm />
        </div>
      </div>
      <div className='sm:w-[30%] sticky top-5 hidden sm:block h-screen'>
        <SideBar />
      </div>
    </div>
  );
}

export default ChatCard;