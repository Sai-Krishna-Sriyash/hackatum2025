"use client"
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState<{Status: string, Event: string} | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetching from your Python Backend
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading(false)
      })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          HackaTUM 2025
        </h1>
        
        <div className="p-8 border border-gray-700 rounded-xl bg-gray-900 min-w-[400px] text-center">
          <h2 className="text-xl mb-4 text-gray-400">System Status</h2>
          {loading ? (
            <p className="animate-pulse">Connecting to Python Brain...</p>
          ) : data ? (
            <div className="space-y-2">
              <p className="text-green-400 text-2xl">● Connected</p>
              <p>Event: {data.Event}</p>
              <p>Status: {data.Status}</p>
            </div>
          ) : (
            <p className="text-red-500">❌ Backend Connection Failed</p>
          )}
        </div>
      </div>
    </main>
  )
}
