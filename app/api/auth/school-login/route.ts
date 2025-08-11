import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'
import jwt from 'jsonwebtoken'

// Lazy load environment variables to avoid build-time errors
function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required.')
  }
  return secret
}

function getSchoolAuthPassword(): string {
  const password = process.env.SCHOOL_AUTH_PASSWORD
  if (!password) {
    throw new Error('SCHOOL_AUTH_PASSWORD environment variable is required.')
  }
  return password
}

export async function POST(request: NextRequest) {
  try {
    const { schoolCode, password } = await request.json()

    if (!schoolCode || !password) {
      return NextResponse.json(
        { error: 'School code and password are required' },
        { status: 400 }
      )
    }

    // Validate school exists and has qualified students
    const schoolQuery = `
      SELECT DISTINCT s.schoolno, s.schoolname, s.city 
      FROM schools s 
      INNER JOIN ats_qualifiers a ON s.schoolno = a.schoolcode 
      WHERE s.schoolno = ? AND a.programmeDetailID = 113
    `
    
    let schoolResults: any[] = []
    
    schoolResults = await executeQuery(schoolQuery, [schoolCode], 'school') as any[]

    // Handle database connection issues gracefully
    if (schoolResults.length === 0) {
      return NextResponse.json(
        { error: 'Invalid school code or no qualified students found' },
        { status: 401 }
      )
    }

    // Validate against configured school auth password
    const validPassword = password === getSchoolAuthPassword()

    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const schoolInfo = schoolResults[0]

    // Generate JWT token
    const token = jwt.sign(
      {
        schoolCode: schoolInfo.schoolno,
        schoolName: schoolInfo.schoolname,
        city: schoolInfo.city
      },
      getJWTSecret(),
      { expiresIn: '24h' }
    )

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      school: {
        code: schoolInfo.schoolno,
        name: schoolInfo.schoolname,
        city: schoolInfo.city
      }
    })

    response.cookies.set('school-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error) {
    console.error('School login error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('JWT_SECRET') || error.message.includes('SCHOOL_AUTH_PASSWORD')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 