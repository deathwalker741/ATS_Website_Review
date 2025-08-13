import { NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const { name, email, school, grade, message } = await request.json()

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }
    if (name.length > 200 || (school && school.length > 200) || (message && message.length > 2000)) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Insert into DB
    const sql = `INSERT INTO schedule_call_requests (name, email, school, grade, message) VALUES (?, ?, ?, ?, ?)`
    await executeQuery(sql, [name.trim(), email.trim(), school?.trim() || null, grade || null, message?.trim() || null])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Schedule call insert failed', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 