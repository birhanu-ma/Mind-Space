import React from 'react'
import LearnDetail from './LearnDetails'
import LearnSideBar from './LearnSideBar'

function LearAndSidebar() {
  return (
    <div className='flex flex-row'>
        <div className='sm:w-[60%]'>
        <LearnDetail/>
            

        </div>
        <div className='sm:w-[38%] sticky top-20 hidden sm:block h-screen'>
        <h1 className="text-lg ml-10 font-semibold text-gray-800 mb-1">
            Recommended Posts
          </h1>
        <LearnSideBar/>

        </div>
    </div>
  )
}

export default LearAndSidebar