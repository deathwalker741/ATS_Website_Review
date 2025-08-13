import mysql from 'mysql2/promise'

// Database configuration for ATS Website (forms, general data)
const atsWebsiteConfig = {
  host: process.env.DB_ATS_HOST,
  port: parseInt(process.env.DB_ATS_PORT || '3306'),
  user: process.env.DB_ATS_USER,
  password: process.env.DB_ATS_PASSWORD,
  database: process.env.DB_ATS_DATABASE || 'ats_website',
  charset: 'utf8mb4',
  timezone: '+05:30', // IST
  // Connection pool settings
  connectionLimit: 10,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}

// Database configuration for School Admin Login (legacy system)
const schoolAdminConfig = {
  host: process.env.DB_SCHOOL_HOST,
  port: parseInt(process.env.DB_SCHOOL_PORT || '3306'),
  user: process.env.DB_SCHOOL_USER,
  password: process.env.DB_SCHOOL_PASSWORD,
  database: process.env.DB_SCHOOL_DATABASE || 'educatio_educat',
  charset: 'utf8mb4',
  timezone: '+05:30', // IST
  // Connection pool settings
  connectionLimit: 10,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}

let atsPool: mysql.Pool | null = null
let schoolPool: mysql.Pool | null = null
let connectionError = false

export async function getConnection(dbType: 'ats' | 'school' = 'ats') {
  // If we've already encountered connection errors, don't try again
  if (connectionError) {
    throw new Error('Database connection unavailable')
  }

  try {
    if (dbType === 'school') {
      if (!schoolPool) {
        // Only create pool if environment variables are available
        if (!process.env.DB_SCHOOL_PASSWORD) {
          throw new Error('Database configuration incomplete')
        }
        schoolPool = mysql.createPool(schoolAdminConfig)
        console.log('School admin database pool created successfully')
      }
      return schoolPool
    } else {
      if (!atsPool) {
        // Only create pool if environment variables are available
        if (!process.env.DB_ATS_PASSWORD) {
          throw new Error('Database configuration incomplete')
        }
        atsPool = mysql.createPool(atsWebsiteConfig)
        console.log('ATS website database pool created successfully')
      }
      return atsPool
    }
  } catch (error) {
    connectionError = true
    console.error('Database connection failed:', error)
    throw new Error('Database connection unavailable')
  }
}

export async function executeQuery(query: string, params: any[] = [], dbType: 'ats' | 'school' = 'ats') {
  try {
    const pool = await getConnection(dbType)
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error('Query execution failed:', error)
    // Return empty array instead of throwing error
    return []
  }
}

// Graceful shutdown function
export async function closeDatabaseConnections() {
  const promises = []
  
  if (atsPool) {
    promises.push(atsPool.end())
    atsPool = null
  }
  
  if (schoolPool) {
    promises.push(schoolPool.end())
    schoolPool = null
  }
  
  if (promises.length > 0) {
    await Promise.all(promises)
    console.log('Database connections closed gracefully')
  }
}

// Types for our data structures
export interface SchoolInfo {
  schoolno: string
  schoolname: string
  city: string
}

export interface StudentData {
  panNumber: string
  studentName: string
  class: string
  section: string
  school_student_id: string
  epirt: number
  mpirt: number
  spirt: number
  paymentStatus: string | null
}

export interface SchoolStats {
  schoolCode: string
  schoolName: string
  city: string
  currentYear: {
    qualified: number
    registered: number
    percentage: number
  }
  lastYear: {
    qualified: number
    registered: number
    percentage: number
  }
} 