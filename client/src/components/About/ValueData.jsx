
import React from 'react';
import { GiHumanPyramid } from "react-icons/gi";
import { FaAccessibleIcon } from "react-icons/fa";
import { CgCommunity } from "react-icons/cg";


const valueData = [
  {
    id: 'value-1',
    icon: <GiHumanPyramid size={40} color="black" />,
    title: 'Empowerment',
    description: 'To empower university students by providing a safe space for support and resources, fostering a proactive approach to mental well-being within their campus community.',
  },
  {
    id: 'value-2',
    icon: <FaAccessibleIcon size={40} color="black" />,
    title: 'Accessibility',
    description: 'To create an all-encompassing digital support system that university students can effortlessly access, ensuring vital mental health resources are readily available whenever and wherever they need them.',
  },
  {
    id: 'value-3',
    icon: <CgCommunity size={40} color="black" />,
    title: 'Community',
    description: 'We build a supportive community where university students can openly address mental health concerns, share experiences, access peer support initiatives, and connect with patient mental health experts.',
  },
];

export default valueData;