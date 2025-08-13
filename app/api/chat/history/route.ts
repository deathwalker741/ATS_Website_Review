import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const sessionId = searchParams.get('sessionId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      )
    }

    let query = `
      SELECT 
        id, session_id, user_id, text, is_bot, timestamp,
        user_agent, language, region, page, response_time,
        tokens, confidence
      FROM chat_messages 
      WHERE user_id = ?
    `
    
    let params: any[] = [userId]
    
    if (sessionId) {
      query += ' AND session_id = ?'
      params.push(sessionId)
    }
    
    query += ' ORDER BY timestamp DESC LIMIT ?'
    params.push(limit)

    const results = await executeQuery(query, params, 'ats') as any[]

    // Convert database results to ChatMessage format
    const messages = results.map(row => ({
      id: row.id,
      text: row.text,
      isBot: row.is_bot === 1,
      timestamp: row.timestamp,
      sessionId: row.session_id,
      userId: row.user_id,
      metadata: {
        userAgent: row.user_agent,
        language: row.language,
        region: row.region,
        page: row.page,
        responseTime: row.response_time,
        tokens: row.tokens,
        confidence: row.confidence
      }
    }))

    return NextResponse.json(messages.reverse()) // Return in chronological order

  } catch (error) {
    console.error('Error fetching chat history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    )
  }
} 