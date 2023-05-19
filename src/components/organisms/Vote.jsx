import React from 'react'

export const Vote = () => {
  return (
    <div className="vote-component">
    <div className="question-vote">
      <div className="vote-arrows">
        <span className="up-arrow">▲</span>
        <span className="down-arrow">▼</span>
      </div>
      <span className="vote-count">1</span>
    </div>
  </div>
  )
}
