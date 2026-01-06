"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function GeminiTestPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const handleTest = async () => {
    setLoading(true)
    setError("")
    setResponse("")

    try {
      const res = await fetch("/api/gemini/test", {
        method: "GET",
      })

      const data = await res.json()

      if (data.success) {
        setResponse(data.response)
      } else {
        setError(data.error || "Test failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Gemini API Test</h1>
          <p className="text-gray-600 mb-6">Click the button below to test your Gemini API integration.</p>

          <Button onClick={handleTest} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? "Testing..." : "Test Gemini API"}
          </Button>

          {response && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="font-semibold text-green-900 mb-2">Response:</h2>
              <p className="text-green-800">{response}</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="font-semibold text-red-900 mb-2">Error:</h2>
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">API Endpoints Available:</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                • <code className="bg-white px-2 py-1 rounded">GET /api/gemini/test</code> - Quick test
              </li>
              <li>
                • <code className="bg-white px-2 py-1 rounded">POST /api/gemini/test</code> - POST test
              </li>
              <li>
                • <code className="bg-white px-2 py-1 rounded">POST /api/gemini/chat</code> - Chat endpoint
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
