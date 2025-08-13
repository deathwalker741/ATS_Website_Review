"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Users, 
  UserCheck, 
  School, 
  Award,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Student {
  panNumber: string
  studentName: string
  schoolStudentId: string
  class: string
  section: string
  classSection: string
  percentiles: {
    english: number
    maths: number
    science: number
    highest: number
    highestSubjects: string[]
  }
  registrationStatus: string
  isRegistered: boolean
  isHighPerformer: boolean
}

interface StudentsData {
  schoolInfo: {
    code: string
    name: string
    city: string
  }
  summary: {
    totalQualifiers: number
    totalRegistered: number
    totalPending: number
    percentageRegistered: number
  }
  students: {
    registered: Student[]
    pending: Student[]
    all: Student[]
  }
}

export default function StudentsPage() {
  const [studentsData, setStudentsData] = useState<StudentsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchStudentsData()
  }, [])

  const fetchStudentsData = async () => {
    try {
      const response = await fetch('/api/schools/students')
      
      if (response.status === 401) {
        router.push('/for-schools/login')
        return
      }
      
      const data = await response.json()
      
      if (response.ok) {
        // Normalize: ensure panNumber is always a string to avoid runtime errors when filtering/searching
        const normalizeStudent = (student: any) => ({
          ...student,
          panNumber: student?.panNumber != null ? String(student.panNumber) : ''
        })

        data.students.registered = data.students.registered.map(normalizeStudent)
        data.students.pending = data.students.pending.map(normalizeStudent)
        data.students.all = data.students.all.map(normalizeStudent)

        setStudentsData(data)
      } else {
        setError(data.error || 'Failed to load students data')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Yes':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Attempted':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Yes':
        return <Badge className="bg-green-100 text-green-800">Registered</Badge>
      case 'Attempted':
        return <Badge className="bg-yellow-100 text-yellow-800">Attempted</Badge>
      default:
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>
    }
  }

  const StudentTable = ({ students, title, icon }: { students: Student[], title: string, icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="bg-[#850101] text-white">
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2">{title} ({students.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No students in this category
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ATS PAN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Best Percentile
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr 
                    key={student.panNumber}
                    className={`hover:bg-gray-50 ${student.isHighPerformer ? 'bg-yellow-50' : ''}`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {student.panNumber}
                    </td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${student.isHighPerformer ? 'font-semibold text-[#850101]' : 'text-gray-900'}`}>
                      {student.studentName}
                      {student.isHighPerformer && (
                        <Award className="inline-block h-4 w-4 text-yellow-500 ml-1" />
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.classSection}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold">{student.percentiles.highest}</span>
                      <span className="text-gray-500 text-xs ml-1">
                        ({student.percentiles.highestSubjects.join(', ')})
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(student.registrationStatus)}
                        {getStatusBadge(student.registrationStatus)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setSearchQuery(searchQuery.trimStart())
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#850101] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students data...</p>
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

  if (!studentsData) {
    return null
  }

  const filterStudents = (students: Student[]) => {
    if (!searchQuery.trim()) return students
    const query = searchQuery.toLowerCase()
    return students.filter(s =>
      s.studentName.toLowerCase().includes(query) ||
      s.panNumber.toLowerCase().includes(query) ||
      s.classSection.toLowerCase().includes(query)
    )
  }

  const filteredPending = filterStudents(studentsData.students.pending)
  const filteredRegistered = filterStudents(studentsData.students.registered)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#850101] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/for-schools/dashboard')}
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#850101]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <School className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{studentsData.schoolInfo.name}</h1>
                <p className="text-gray-200">Student Registration Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-[#850101] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#850101]">{studentsData.summary.totalQualifiers}</p>
              <p className="text-sm text-gray-600">Total Qualified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{studentsData.summary.totalRegistered}</p>
              <p className="text-sm text-gray-600">Registered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{studentsData.summary.totalPending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#850101] mb-2">{studentsData.summary.percentageRegistered}%</div>
              <p className="text-sm text-gray-600">Registration Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ATS PAN, or class..."
            className="sm:max-w-sm"
          />
          <Button type="submit">Search</Button>
        </form>

        {/* Note */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            <strong>Note:</strong> Students with 90+ percentile in any subject are highlighted in yellow. 
            "Attempted" means the student visited the registration page but did not complete the process.
          </AlertDescription>
        </Alert>

        {/* Tables side-by-side on md+ screens, stacked on smaller devices */}
        <div className="grid gap-10 md:grid-cols-2">
            <StudentTable 
            students={filteredPending} 
            title={`Pending Registrations`} 
              icon={<AlertTriangle className="h-5 w-5" />}
            />

            <StudentTable 
            students={filteredRegistered} 
            title={`Registered Students`} 
              icon={<CheckCircle className="h-5 w-5" />}
            />
        </div>
      </div>
    </div>
  )
} 