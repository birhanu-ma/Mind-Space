import React from 'react';
import Hero from '../components/community/Hero';
import ForumGrid from '../components/community/ForumGrid';
import CreateForum from '../components/community/CreateForum';

function Community() {
  return (
    <div className="text-center">
      <Hero />
      <ForumGrid />
      <CreateForum />
    </div>
  );
}

export default Community;
