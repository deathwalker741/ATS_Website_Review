import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const chatMessage = await request.json()
    
    // Validate required fields
    if (!chatMessage.id || !chatMessage.text || typeof chatMessage.isBot !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields: id, text, isBot' },
        { status: 400 }
      )
    }

    // Insert chat message into database
    const query = `
      INSERT INTO chat_messages (
        id, session_id, user_id, text, is_bot, timestamp,
        user_agent, language, region, page, response_time, 
        tokens, confidence
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params = [
      chatMessage.id,
      chatMessage.sessionId || null,
      chatMessage.userId || null,
      chatMessage.text,
      chatMessage.isBot ? 1 : 0,
      new Date(chatMessage.timestamp),
      chatMessage.metadata?.userAgent || null,
      chatMessage.metadata?.language || null,
      chatMessage.metadata?.region || null,
      chatMessage.metadata?.page || null,
      chatMessage.metadata?.responseTime || null,
      chatMessage.metadata?.tokens || null,
      chatMessage.metadata?.confidence || null
    ]

    await executeQuery(query, params, 'ats')

    return NextResponse.json({ success: true, id: chatMessage.id })

  } catch (error) {
    console.error('Error storing chat message:', error)
    return NextResponse.json(
      { error: 'Failed to store chat message' },
      { status: 500 }
    )
  }
} 