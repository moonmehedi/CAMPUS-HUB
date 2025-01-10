'use client'

import { useState } from 'react'
import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import '../styles/trainbotStyle.css'

export default function DashboardPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleTrainBot = async () => {
    if (!question.trim() || !answer.trim()) {
      alert('Please provide both question and answer')
      return
    }

    try {
      // TODO: Implement your bot training logic here
      console.log('Training bot with:', { question, answer })
      
      // Clear the form after successful submission
      setQuestion('')
      setAnswer('')
    } catch (error) {
      console.error('Error training bot:', error)
      alert('Failed to train bot. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <div className="train-bot-container">
              <div className="input-section">
                <label htmlFor="question" className="input-label">
                  Question
                </label>
                <textarea
                  id="question"
                  className="text-area"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter the question you want to train the bot with..."
                />
              </div>

              <div className="input-section">
                <label htmlFor="answer" className="input-label">
                  Answer
                </label>
                <textarea
                  id="answer"
                  className="text-area"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer for the question..."
                />
              </div>

              <button 
                className="train-button"
                onClick={handleTrainBot}
              >
                Train the BOT
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

