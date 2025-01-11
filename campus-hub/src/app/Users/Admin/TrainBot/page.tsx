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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8 px-6">
            <WelcomeBanner />
            <div className="train-bot-container mt-8">
              <h2 className="text-2xl font-bold mb-6 text-center relative">
                Train the Bot
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-20 bg-blue-600 rounded-full"></span>
              </h2>
              
              <div className="bg-white shadow-lg rounded-lg p-8">
                <p className="text-center text-lg mb-6">
                  Enter a question and answer or upload a CSV file to train the bot with custom data.
                </p>

                <div className="input-section mb-4">
                  <label htmlFor="question" className="block text-lg font-medium mb-2">
                    Question
                  </label>
                  <textarea
                    id="question"
                    className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-400 transition-all"
                    style={{ minHeight: '150px' }}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter the question you want to train the bot with..."
                    disabled={isTraining}
                  />
                </div>

                <div className="input-section mb-4">
                  <label htmlFor="answer" className="block text-lg font-medium mb-2">
                    Answer
                  </label>
                  <textarea
                    id="answer"
                    className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-400 transition-all"
                    style={{ minHeight: '150px' }}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter the answer for the question..."
                    disabled={isTraining}
                  />
                </div>

                <CSVUpload onUploadComplete={handleCSVUploadComplete} />

                <div className="flex justify-center mt-6">
                  <button 
                    className={`bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg transform transition-transform ${
                      isTraining ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-blue-700'
                    }`}
                    onClick={handleTrainBot}
                    disabled={isTraining}
                  >
                    {isTraining ? 'Training...' : 'Train the BOT'}
                  </button>
                </div>
              </div>

              {isTraining && (
                <div className="mt-6">
                  <TrainingProgress progress={progress} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
