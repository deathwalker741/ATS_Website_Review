import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const chatSession = await request.json()
    
    // Validate required fields
    if (!chatSession.id || !chatSession.startTime) {
      return NextResponse.json(
        { error: 'Missing required fields: id, startTime' },
        { status: 400 }
      )
    }

    // Insert or update chat session in database
    const query = `
      INSERT INTO chat_sessions (
        id, user_id, start_time, end_time, message_count,
        total_tokens, average_response_time, user_satisfaction,
        topics, resolved, user_agent, device, location, referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        end_time = VALUES(end_time),
        message_count = VALUES(message_count),
        total_tokens = VALUES(total_tokens),
        average_response_time = VALUES(average_response_time),
        user_satisfaction = VALUES(user_satisfaction),
        topics = VALUES(topics),
        resolved = VALUES(resolved)
    `

    const params = [
      chatSession.id,
      chatSession.userId || null,
      new Date(chatSession.startTime),
      chatSession.endTime ? new Date(chatSession.endTime) : null,
      chatSession.messageCount || 0,
      chatSession.totalTokens || null,
      chatSession.averageResponseTime || null,
      chatSession.userSatisfaction || null,
      JSON.stringify(chatSession.topics || []),
      chatSession.resolved ? 1 : 0,
      chatSession.metadata?.userAgent || null,
      chatSession.metadata?.device || null,
      chatSession.metadata?.location || null,
      chatSession.metadata?.referrer || null
    ]

    await executeQuery(query, params, 'ats')

    return NextResponse.json({ success: true, id: chatSession.id })

  } catch (error) {
    console.error('Error storing chat session:', error)
    return NextResponse.json(
      { error: 'Failed to store chat session' },
      { status: 500 }
    )
  }
} 