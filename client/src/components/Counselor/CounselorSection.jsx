import React,{useState} from 'react'
import CounselorDashBoard from './CounselorDashBoard'
import SideBar from './SideBar'

function CounselorSection() {
    const [dashBoard, setDashBoard] = useState(true);
  return (
    <div className='m-15 sm:relative'>
        <SideBar setDashBoard = {setDashBoard}/>
        {dashBoard && <CounselorDashBoard/>}

    </div>
  )
}

export default CounselorSection