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
  const [isUploading, setIsUploading] = useState(false) // Track uploading state
  const [uploadProgress, setUploadProgress] = useState(0) // Track upload progress
  const [trainingProgress, setTrainingProgress] = useState(0) // Track training progress
  const [csvFile, setCsvFile] = useState<File | null>(null) // Store the uploaded CSV file
  const [message, setMessage] = useState('')

  const handleTrainBot = async () => {
    if ((!question.trim() || !answer.trim()) && !csvFile) {
      alert('Please provide either a question and answer or upload a CSV file')
      return
    }

    setIsTraining(true)
    setTrainingProgress(0)

    try {
      if (csvFile) {
        // Handle batch training with CSV file
        const formData = new FormData()
        formData.append('file', csvFile) // Use the stored CSV file

        // Simulate training progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200))
          setTrainingProgress(i)
        }

        const response = await fetch('http://127.0.0.1:8000/blog/train_batch/', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to perform batch training')
        }

        const data = await response.json()
        setMessage(data.message || 'Batch training successful!')
      } else {
        // Handle individual training
        const response = await fetch('http://127.0.0.1:8000/blog/train_individual/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question, answer }),
        })

        if (!response.ok) {
          throw new Error('Failed to train the chatbot')
        }

        const data = await response.json()
        setMessage(data.message || 'Training successful!')
      }

      // Clear the form after successful submission
      setQuestion('')
      setAnswer('')
      setCsvFile(null)
    } catch (error) {
      console.error('Error training bot:', error)
      setMessage('Failed to train bot. Please try again.')
    } finally {
      setIsTraining(false)
    }
  }

  const handleCSVUploadComplete = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    setCsvFile(file) // Store the uploaded CSV file in state
    setIsUploading(false)
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
                    disabled={isTraining || isUploading}
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
                    disabled={isTraining || isUploading}
                  />
                </div>

                <CSVUpload onUploadComplete={handleCSVUploadComplete} />

                <div className="flex justify-center mt-6">
                  <button 
                    className={`bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg transform transition-transform ${
                      isTraining || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-blue-700'
                    }`}
                    onClick={handleTrainBot}
                    disabled={isTraining || isUploading}
                  >
                    {isTraining ? 'Training...' : 'Train the BOT'}
                  </button>
                </div>
              </div>

              {(isUploading || isTraining) && (
                <div className="mt-6">
                  <TrainingProgress progress={isUploading ? uploadProgress : trainingProgress} />
                  <p className="text-center mt-2">
                    {isUploading ? 'Uploading...' : 'Training...'} {isUploading ? uploadProgress : trainingProgress}% Complete
                  </p>
                </div>
              )}

              {message && (
                <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg">
                  {message}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}