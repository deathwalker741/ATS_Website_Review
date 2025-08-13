import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'
import jwt from 'jsonwebtoken'

// Lazy load JWT secret to avoid build-time errors
function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required.')
  }
  return secret
}

function verifyToken(request: NextRequest) {
  const token = request.cookies.get('school-token')?.value
  if (!token) {
    throw new Error('No authentication token provided')
  }

  try {
    return jwt.verify(token, getJWTSecret()) as any
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const decoded = verifyToken(request)
    const schoolCode = decoded.schoolCode

    // Check if database is available
    if (!process.env.DB_SCHOOL_PASSWORD) {
      return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 })
    }

    // Get school info
    const schoolQuery = `
      SELECT schoolno, schoolname, city 
      FROM schools 
      WHERE schoolno = ?
    `
    let schoolResults: any[] = []
    
    schoolResults = await executeQuery(schoolQuery, [schoolCode], 'school') as any[]
    
    const schoolInfo = schoolResults[0] || { 
      schoolno: schoolCode, 
      schoolname: 'School Information Unavailable', 
      city: 'City Information Unavailable' 
    }

    // Get current year stats (2025)
    const currentYearQuery = `
      SELECT 
        COUNT(DISTINCT a.panNumber) AS totalQualifiers,
        COUNT(DISTINCT CASE WHEN b.paymentStatus = 'paid' THEN a.panNumber END) AS successfulPayments
      FROM ats_qualifiers a 
      LEFT JOIN duketip_registrationDetails b ON a.panNumber = b.panNumber AND b.year = 2025
      WHERE a.schoolcode = ? AND a.programmeDetailID = 113
    `
    
    let currentYearResults: any[] = []
    currentYearResults = await executeQuery(currentYearQuery, [schoolCode], 'school') as any[]
    const currentYear = currentYearResults[0] || { totalQualifiers: 0, successfulPayments: 0 }

    // Get last year stats (2024)
    const lastYearQuery = `
      SELECT 
        COUNT(DISTINCT a.panNumber) AS totalQualifiers,
        COUNT(DISTINCT CASE WHEN b.paymentStatus = 'paid' THEN a.panNumber END) AS successfulPayments
      FROM ats_qualifiers a 
      LEFT JOIN duketip_registrationDetails b ON a.panNumber = b.panNumber AND b.year = 2024
      WHERE a.schoolcode = ? AND a.programmeDetailID = 101
    `
    
    let lastYearResults: any[] = []
    lastYearResults = await executeQuery(lastYearQuery, [schoolCode], 'school') as any[]
    const lastYear = lastYearResults[0] || { totalQualifiers: 0, successfulPayments: 0 }

    // Calculate percentages
    const currentPercentage = currentYear.totalQualifiers > 0 
      ? Math.round((currentYear.successfulPayments / currentYear.totalQualifiers) * 100 * 10) / 10
      : 0

    const lastPercentage = lastYear.totalQualifiers > 0
      ? Math.round((lastYear.successfulPayments / lastYear.totalQualifiers) * 100 * 10) / 10
      : 0

    const dashboardData = {
      schoolInfo: {
        code: schoolInfo.schoolno,
        name: schoolInfo.schoolname,
        city: schoolInfo.city
      },
      currentYear: {
        year: 2025,
        qualified: parseInt(currentYear.totalQualifiers) || 0,
        registered: parseInt(currentYear.successfulPayments) || 0,
        percentage: currentPercentage
      },
      lastYear: {
        year: 2024,
        qualified: parseInt(lastYear.totalQualifiers) || 0,
        registered: parseInt(lastYear.successfulPayments) || 0,
        percentage: lastPercentage
      }
    }

    return NextResponse.json(dashboardData)

  } catch (error) {
    console.error('Dashboard API error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('JWT_SECRET')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
} 