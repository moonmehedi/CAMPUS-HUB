'use client'

import { useState } from 'react'
import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { WelcomeBanner } from "../Components/welcome-banner"
import { CSVUpload } from "../Components/csv-upload"
import { TrainingProgress } from "../Components/training-progress"

export default function DashboardPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [csvData, setCsvData] = useState<string | null>(null)

  const handleTrainBot = async () => {
    if ((!question.trim() || !answer.trim()) && !csvData) {
      alert('Please provide either a question and answer or upload a CSV file')
      return
    }

    setIsTraining(true)
    setProgress(0)

    try {
      // Simulating training process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setProgress(i)
      }

      if (csvData) {
        console.log('Training bot with CSV data:', csvData)
      } else {
        console.log('Training bot with:', { question, answer })
      }
      
      // Clear the form after successful submission
      setQuestion('')
      setAnswer('')
      setCsvData(null)
    } catch (error) {
      console.error('Error training bot:', error)
      alert('Failed to train bot. Please try again.')
    } finally {
      setIsTraining(false)
    }
  }

  const handleCSVUploadComplete = (data: string) => {
    setCsvData(data)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <WelcomeBanner />
            <div className="train-bot-container mt-8">
              <h2 className="text-2xl font-bold mb-4">Train the Bot</h2>
              <div className="input-section">
                <label htmlFor="question" className="input-label">
                  Question
                </label>
                <textarea
                  id="question"
                  className="text-area w-full p-2 border rounded"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter the question you want to train the bot with..."
                  disabled={isTraining}
                />
              </div>

              <div className="input-section mt-4">
                <label htmlFor="answer" className="input-label">
                  Answer
                </label>
                <textarea
                  id="answer"
                  className="text-area w-full p-2 border rounded"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer for the question..."
                  disabled={isTraining}
                />
              </div>

              <CSVUpload onUploadComplete={handleCSVUploadComplete} />

              <button 
                className={`train-button mt-4 bg-blue-600 text-white px-4 py-2 rounded ${isTraining ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={handleTrainBot}
                disabled={isTraining}
              >
                {isTraining ? 'Training...' : 'Train the BOT'}
              </button>

              {isTraining && <TrainingProgress progress={progress} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

