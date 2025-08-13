"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { School, Lock, ArrowRight } from 'lucide-react'

export default function SchoolLoginPage() {
  const [schoolCode, setSchoolCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/school-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolCode, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to dashboard on successful login
        router.push('/for-schools/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#850101] rounded-full flex items-center justify-center mb-4">
            <School className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">School Portal</h2>
          <p className="text-gray-600">
            Access your school's ATS registration data and student information
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-[#850101] text-white rounded-t-lg">
            <CardTitle className="text-center">Login to Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <label htmlFor="schoolCode" className="block text-sm font-medium text-gray-700 mb-2">
                  School Code
                </label>
                <div className="relative">
                  <Input
                    id="schoolCode"
                    type="text"
                    value={schoolCode}
                    onChange={(e) => setSchoolCode(e.target.value)}
                    placeholder="Enter your school code"
                    className="pl-10"
                    required
                  />
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#850101] hover:bg-[#650101] text-white py-3 font-semibold transition-all duration-300"
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Login Instructions:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Use your school code as username</li>
                  <li>Password will be communicated by Ei (do not share).</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact ATS Support:{' '}
            <a href="mailto:eitalentsearch@ei.study" className="text-[#850101] hover:underline">
              eitalentsearch@ei.study
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 