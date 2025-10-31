import React from 'react'
import MessageForm from './MessageForm'
import LearnSection from './LearnSection'
import RelatedTopicsSection from './RelatedTopicSection'

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