import React from 'react'
import MessageForm from '../LearnDetail/MessageForm'
import LearnSection from '../LearnDetail/LearnSection'
import RelatedTopicsSection from '../LearnDetail/RelatedTopicCard'

function LearnDetails() {
  return (
    <div>
      <LearnSection/>
      <MessageForm/>
      <RelatedTopicsSection/>
    </div>
  )
}

export default LearnDetails