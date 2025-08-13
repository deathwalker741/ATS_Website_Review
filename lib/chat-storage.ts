// Chat Storage System for Ei ATS Chatbot
// Handles storage, sessions, analytics, and export functionality

// Generate UUID without external dependency
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  sessionId?: string
  userId?: string
  metadata?: {
    userAgent?: string
    language?: string
    region?: string
    page?: string
    responseTime?: number
    tokens?: number
    confidence?: number
  }
}

export interface ChatSession {
  id: string
  userId?: string
  startTime: Date
  endTime?: Date
  messageCount: number
  totalTokens?: number
  averageResponseTime?: number
  userSatisfaction?: number
  topics: string[]
  resolved: boolean
  metadata?: {
    userAgent?: string
    device?: string
    location?: string
    referrer?: string
  }
}

export interface ChatAnalytics {
  totalSessions: number
  totalMessages: number
  averageSessionLength: number
  popularTopics: { topic: string; count: number }[]
  commonQuestions: { question: string; count: number }[]
  userSatisfactionScore: number
  peakUsageHours: { hour: number; count: number }[]
  responseTimeStats: {
    average: number
    median: number
    p95: number
  }
}

class ChatStorageManager {
  private currentSessionId: string | null = null
  private userId: string | null = null
  private dbStorageEnabled: boolean = false

  constructor() {
    this.initializeSession()
    this.checkDatabaseAvailability()
  }

  // Initialize or restore user session
  private initializeSession() {
    // Get or create user ID
    this.userId = localStorage.getItem('ats_chat_user_id')
    if (!this.userId) {
      this.userId = generateUUID()
      localStorage.setItem('ats_chat_user_id', this.userId)
    }

    // Get current session or create new one
    const sessionData = sessionStorage.getItem('ats_chat_session')
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData)
        this.currentSessionId = session.id
      } catch {
        this.startNewSession()
      }
    } else {
      this.startNewSession()
    }
  }

  // Start a new chat session
  public startNewSession(): string {
    this.currentSessionId = generateUUID()
    const session: ChatSession = {
      id: this.currentSessionId,
      userId: this.userId || '',
      startTime: new Date(),
      messageCount: 0,
      topics: [],
      resolved: false,
      metadata: {
        userAgent: navigator.userAgent,
        device: this.getDeviceType(),
        location: this.getLocation(),
        referrer: document.referrer
      }
    }

    // Store in session storage
    sessionStorage.setItem('ats_chat_session', JSON.stringify(session))
    
    // Store in database if available
    if (this.dbStorageEnabled) {
      this.saveChatSessionToDatabase(session)
    }

    return this.currentSessionId
  }

  // Save message to storage
  public async saveMessage(message: ChatMessage): Promise<void> {
    // Add session and user info
    message.sessionId = this.currentSessionId || ''
    message.userId = this.userId || ''
    message.metadata = {
      ...message.metadata,
      userAgent: navigator.userAgent,
      language: navigator.language,
      region: this.getRegion(),
      page: window.location.pathname
    }

    // Save to localStorage (immediate backup)
    this.saveToLocalStorage(message)

    // Save to database if available
    if (this.dbStorageEnabled) {
      try {
        await this.saveChatMessageToDatabase(message)
      } catch (error) {
        console.warn('Failed to save to database - connection issue')
      }
    }

    // Update session stats
    this.updateSessionStats(message)
  }

  // Save to localStorage as backup
  private saveToLocalStorage(message: ChatMessage) {
    const storageKey = 'ats_chat_messages'
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]')
      existing.push(message)
      
      // Keep only last 100 messages to prevent storage overflow
      const recent = existing.slice(-100)
      localStorage.setItem(storageKey, JSON.stringify(recent))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }

  // Save message to database
  private async saveChatMessageToDatabase(message: ChatMessage): Promise<void> {
    const response = await fetch('/api/chat/store-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })

    if (!response.ok) {
      throw new Error(`Database save failed: ${response.status}`)
    }
  }

  // Save session to database
  private async saveChatSessionToDatabase(session: ChatSession): Promise<void> {
    try {
      await fetch('/api/chat/store-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session)
      })
    } catch (error) {
      console.warn('Failed to save session to database:', error)
    }
  }

  // Update session statistics
  private updateSessionStats(message: ChatMessage) {
    try {
      const sessionData = sessionStorage.getItem('ats_chat_session')
      if (sessionData) {
        const session = JSON.parse(sessionData)
        session.messageCount++
        session.endTime = new Date()
        
        // Extract topics from user messages
        if (!message.isBot) {
          const topics = this.extractTopics(message.text)
          session.topics = [...new Set([...session.topics, ...topics])]
        }

        sessionStorage.setItem('ats_chat_session', JSON.stringify(session))
      }
    } catch (error) {
      console.warn('Failed to update session stats:', error)
    }
  }

  // Extract topics from message text
  private extractTopics(text: string): string[] {
    const topics: string[] = []
    const lowerText = text.toLowerCase()

    // Define topic keywords
    const topicMap = {
      'registration': ['register', 'registration', 'sign up', 'enroll'],
      'test-dates': ['date', 'when', 'schedule', 'time'],
      'fees': ['fee', 'cost', 'price', 'payment', 'money'],
      'eligibility': ['eligible', 'qualify', 'requirement', 'criteria'],
      'universities': ['university', 'college', 'johns hopkins', 'uc berkeley', 'northwestern'],
      'results': ['result', 'score', 'grade', 'performance', 'certificate'],
      'contact': ['contact', 'help', 'support', 'phone', 'email'],
      'technical': ['error', 'problem', 'issue', 'bug', 'not working']
    }

    Object.entries(topicMap).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        topics.push(topic)
      }
    })

    return topics
  }

  // Get chat history for current user
  public async getChatHistory(limit: number = 50): Promise<ChatMessage[]> {
    if (this.dbStorageEnabled) {
      try {
        const response = await fetch(`/api/chat/history?userId=${this.userId}&limit=${limit}`)
        if (response.ok) {
          return await response.json()
        }
      } catch (error) {
        console.warn('Failed to fetch from database:', error)
      }
    }

    // Fallback to localStorage
    const localMessages = localStorage.getItem('ats_chat_messages')
    if (localMessages) {
      return JSON.parse(localMessages).slice(-limit)
    }

    return []
  }

  // Get analytics data
  public async getAnalytics(): Promise<ChatAnalytics> {
    if (this.dbStorageEnabled) {
      try {
        const response = await fetch('/api/chat/analytics')
        if (response.ok) {
          return await response.json()
        }
      } catch (error) {
        console.warn('Failed to fetch analytics:', error)
      }
    }

    // Return basic analytics from localStorage
    return this.getBasicAnalytics()
  }

  // Basic analytics from localStorage
  private getBasicAnalytics(): ChatAnalytics {
    const messages = JSON.parse(localStorage.getItem('ats_chat_messages') || '[]')
    const sessions = new Set(messages.map((m: ChatMessage) => m.sessionId).filter(Boolean))
    
    return {
      totalSessions: sessions.size,
      totalMessages: messages.length,
      averageSessionLength: messages.length / Math.max(sessions.size, 1),
      popularTopics: [],
      commonQuestions: [],
      userSatisfactionScore: 0,
      peakUsageHours: [],
      responseTimeStats: {
        average: 0,
        median: 0,
        p95: 0
      }
    }
  }

  // End current session
  public endSession(satisfaction?: number) {
    if (this.currentSessionId) {
      try {
        const sessionData = sessionStorage.getItem('ats_chat_session')
        if (sessionData) {
          const session = JSON.parse(sessionData)
          session.endTime = new Date()
          session.userSatisfaction = satisfaction
          session.resolved = satisfaction ? satisfaction >= 4 : false

          sessionStorage.setItem('ats_chat_session', JSON.stringify(session))
          
          // Update database if available
          if (this.dbStorageEnabled) {
            this.saveChatSessionToDatabase(session)
          }
        }
      } catch (error) {
        console.warn('Failed to end session:', error)
      }
    }
  }

  // Clear all chat data
  public clearAllData() {
    localStorage.removeItem('ats_chat_messages')
    localStorage.removeItem('ats_chat_user_id')
    sessionStorage.removeItem('ats_chat_session')
    
    // Reinitialize
    this.currentSessionId = null
    this.userId = null
    this.initializeSession()
  }

  // Utility methods
  private async checkDatabaseAvailability() {
    try {
      const response = await fetch('/api/chat/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this.dbStorageEnabled = response.ok
      
      if (!response.ok) {
        console.warn('Database storage unavailable, using localStorage fallback')
      }
    } catch (error) {
      console.warn('Database health check failed, using localStorage fallback')
      this.dbStorageEnabled = false
    }
  }

  private getDeviceType(): string {
    const ua = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet'
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'mobile'
    return 'desktop'
  }

  private getLocation(): string {
    // You could integrate with a geolocation service here
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  private getRegion(): string {
    // Get region from your existing region context or browser
    // Try to get from localStorage first, then fallback to 'IND'
    const storedRegion = localStorage.getItem('ats_region')
    return storedRegion === 'INT' ? 'INT' : 'IND'
  }

  // Getters
  public getCurrentSessionId(): string | null {
    return this.currentSessionId
  }

  public getUserId(): string | null {
    return this.userId
  }

  public isDatabaseEnabled(): boolean {
    return this.dbStorageEnabled
  }
}

// Export singleton instance
export const chatStorage = new ChatStorageManager()

// Utility functions for components
export const saveChatMessage = (message: ChatMessage) => chatStorage.saveMessage(message)
export const getChatHistory = (limit?: number) => chatStorage.getChatHistory(limit)
export const startNewChatSession = () => chatStorage.startNewSession()
export const endChatSession = (satisfaction?: number) => chatStorage.endSession(satisfaction)
export const clearChatData = () => chatStorage.clearAllData()
export const getChatAnalytics = () => chatStorage.getAnalytics() 