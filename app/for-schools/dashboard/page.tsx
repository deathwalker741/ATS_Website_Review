"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  TrendingDown, 
  School, 
  FileText,
  LogOut,
  Calendar,
  BarChart3
} from 'lucide-react'

interface DashboardData {
  schoolInfo: {
    code: string
    name: string
    city: string
  }
  currentYear: {
    year: number
    qualified: number
    registered: number
    percentage: number
  }
  lastYear: {
    year: number
    qualified: number
    registered: number
    percentage: number
  }
}

export default function SchoolDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/schools/dashboard')
      
      if (response.status === 401) {
        router.push('/for-schools/login')
        return
      }
      
      const data = await response.json()
      
      if (response.ok) {
        setDashboardData(data)
      } else {
        setError(data.error || 'Failed to load dashboard data')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    // Clear the cookie by calling logout endpoint or just redirect
    document.cookie = 'school-token=; Max-Age=0; path=/;'
    router.push('/for-schools/login')
  }

  const getPercentageChange = () => {
    if (!dashboardData) return 0
    const current = dashboardData.currentYear.percentage
    const last = dashboardData.lastYear.percentage
    if (last === 0) return current > 0 ? 100 : 0
    return Math.round(((current - last) / last) * 100)
  }

  const getQualifiedChange = () => {
    if (!dashboardData) return 0
    const current = dashboardData.currentYear.qualified
    const last = dashboardData.lastYear.qualified
    return current - last
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#850101] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  const percentageChange = getPercentageChange()
  const qualifiedChange = getQualifiedChange()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#850101] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <School className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{dashboardData.schoolInfo.name}</h1>
                <p className="text-gray-200">
                  {dashboardData.schoolInfo.city} • School Code: {dashboardData.schoolInfo.code}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-white bg-transparent text-white hover:bg-white hover:text-[#850101]"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">2025 Qualified</p>
                  <p className="text-3xl font-bold text-[#850101]">
                    {dashboardData.currentYear.qualified}
                  </p>
                </div>
                <Users className="h-8 w-8 text-[#850101]" />
              </div>
              {qualifiedChange !== 0 && (
                <div className="flex items-center mt-2">
                  {qualifiedChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${qualifiedChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {qualifiedChange > 0 ? '+' : ''}{qualifiedChange} from 2024
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">2025 Registered</p>
                  <p className="text-3xl font-bold text-green-600">
                    {dashboardData.currentYear.registered}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {dashboardData.currentYear.percentage}% of qualified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">2024 Registered</p>
                  <p className="text-3xl font-bold text-gray-600">
                    {dashboardData.lastYear.registered}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {dashboardData.lastYear.percentage}% of qualified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Registration Rate</p>
                  <p className="text-3xl font-bold text-[#850101]">
                    {dashboardData.currentYear.percentage}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-[#850101]" />
              </div>
              {percentageChange !== 0 && (
                <div className="flex items-center mt-2">
                  {percentageChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${percentageChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {percentageChange > 0 ? '+' : ''}{percentageChange}% vs 2024
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Year Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader className="bg-[#850101] text-white">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                ATS 2025 (Current Year)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Qualified Students:</span>
                  <span className="font-bold text-xl text-[#850101]">
                    {dashboardData.currentYear.qualified}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Successfully Registered:</span>
                  <span className="font-bold text-xl text-green-600">
                    {dashboardData.currentYear.registered}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registration Rate:</span>
                  <span className="font-bold text-xl text-[#850101]">
                    {dashboardData.currentYear.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#850101] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${dashboardData.currentYear.percentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-600 text-white">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                ATS 2024 (Last Year)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Qualified Students:</span>
                  <span className="font-bold text-xl text-gray-700">
                    {dashboardData.lastYear.qualified}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Successfully Registered:</span>
                  <span className="font-bold text-xl text-gray-700">
                    {dashboardData.lastYear.registered}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registration Rate:</span>
                  <span className="font-bold text-xl text-gray-700">
                    {dashboardData.lastYear.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gray-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${dashboardData.lastYear.percentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <Button
            onClick={() => router.push('/for-schools/students')}
            size="lg"
            className="bg-[#850101] hover:bg-[#650101] text-white px-8 py-3 text-lg font-semibold"
          >
            <FileText className="h-5 w-5 mr-2" />
            View Detailed Student Information
          </Button>
        </div>
      </div>
    </div>
  )
} 