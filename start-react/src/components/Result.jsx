import React from 'react'
import Button from './Button'

const Result = ({ result, onRestart }) => {
  return (
    <section className="container">
      <h2>Game Over!</h2>
      <h3>You {result}!</h3>
      <Button title="Start New Game" onClick={onRestart} />
    </section>
  )
}

export default Result