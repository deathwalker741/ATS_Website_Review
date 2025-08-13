import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get total sessions and messages
    const statsQuery = `
      SELECT 
        COUNT(DISTINCT s.id) as total_sessions,
        COUNT(m.id) as total_messages,
        AVG(s.message_count) as avg_session_length,
        AVG(s.user_satisfaction) as avg_satisfaction,
        AVG(s.average_response_time) as avg_response_time
      FROM chat_sessions s
      LEFT JOIN chat_messages m ON s.id = m.session_id
      WHERE s.start_time >= ?
    `
    
    const stats = await executeQuery(statsQuery, [startDate], 'ats') as any[]
    const mainStats = stats[0] || {}

    // Get popular topics
    const topicsQuery = `
      SELECT topics, COUNT(*) as count
      FROM chat_sessions
      WHERE start_time >= ? AND topics IS NOT NULL AND topics != '[]'
      GROUP BY topics
      ORDER BY count DESC
      LIMIT 10
    `
    
    const topicsResults = await executeQuery(topicsQuery, [startDate], 'ats') as any[]
    const popularTopics = topicsResults.flatMap(row => {
      try {
        const topics = JSON.parse(row.topics)
        return topics.map((topic: string) => ({ topic, count: row.count }))
      } catch {
        return []
      }
    })

    // Aggregate topics by name
    const topicCounts: { [key: string]: number } = {}
    popularTopics.forEach(({ topic, count }) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + count
    })
    
    const aggregatedTopics = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Get common questions (user messages)
    const questionsQuery = `
      SELECT text, COUNT(*) as count
      FROM chat_messages
      WHERE is_bot = 0 
        AND timestamp >= ?
        AND LENGTH(text) > 10
      GROUP BY text
      ORDER BY count DESC
      LIMIT 10
    `
    
    const questionsResults = await executeQuery(questionsQuery, [startDate], 'ats') as any[]
    const commonQuestions = questionsResults.map(row => ({
      question: row.text,
      count: row.count
    }))

    // Get peak usage hours
    const hoursQuery = `
      SELECT 
        HOUR(timestamp) as hour,
        COUNT(*) as count
      FROM chat_messages
      WHERE timestamp >= ?
      GROUP BY HOUR(timestamp)
      ORDER BY count DESC
    `
    
    const hoursResults = await executeQuery(hoursQuery, [startDate], 'ats') as any[]
    const peakUsageHours = hoursResults.map(row => ({
      hour: row.hour,
      count: row.count
    }))

    // Get response time statistics
    const responseTimeQuery = `
      SELECT response_time
      FROM chat_messages
      WHERE response_time IS NOT NULL 
        AND timestamp >= ?
        AND response_time > 0
      ORDER BY response_time
    `
    
    const responseResults = await executeQuery(responseTimeQuery, [startDate], 'ats') as any[]
    const responseTimes = responseResults.map(row => row.response_time)
    
    let responseTimeStats = {
      average: 0,
      median: 0,
      p95: 0
    }

    if (responseTimes.length > 0) {
      responseTimeStats.average = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      responseTimeStats.median = responseTimes[Math.floor(responseTimes.length / 2)]
      responseTimeStats.p95 = responseTimes[Math.floor(responseTimes.length * 0.95)]
    }

    const analytics = {
      totalSessions: mainStats.total_sessions || 0,
      totalMessages: mainStats.total_messages || 0,
      averageSessionLength: mainStats.avg_session_length || 0,
      popularTopics: aggregatedTopics,
      commonQuestions,
      userSatisfactionScore: mainStats.avg_satisfaction || 0,
      peakUsageHours,
      responseTimeStats
    }

    return NextResponse.json(analytics)

  } catch (error) {
    console.error('Error fetching chat analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat analytics' },
      { status: 500 }
    )
  }
} 