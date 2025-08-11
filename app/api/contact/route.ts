import { NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Basic validation and length limits
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (name.length > 200 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const sql = `INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`
    await executeQuery(sql, [name.trim(), email.trim(), phone?.trim() || null, subject.trim(), message.trim()])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form insert failed', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 