# Chat Storage System Documentation

## Overview

The Ei ATS website now includes a comprehensive chat storage system that automatically saves all chatbot conversations, provides analytics, and offers export functionality. This system ensures no conversation is lost and provides valuable insights into user interactions.

## 🏗️ System Architecture

### Core Components

1. **Chat Storage Manager** (`lib/chat-storage.ts`)
   - Handles all storage operations
   - Manages user sessions and IDs
   - Provides export functionality
   - Tracks analytics and metadata

2. **Database API Routes** (`app/api/chat/`)
   - `store-message` - Saves individual messages
   - `store-session` - Saves session information
   - `history` - Retrieves chat history
   - `analytics` - Provides usage analytics
   - `health` - Database connectivity check

3. **Enhanced Chatbot** (`components/intelligent-chatbot.tsx`)
   - Automatic message storage
   - Session tracking
   - Export functionality
   - User rating system

4. **Database Schema** (`scripts/create-chat-tables.sql`)
   - Message storage with metadata
   - Session tracking with analytics
   - Feedback and rating system

## 📊 Features

### Core Functionality
- **Message Storage**: All chat messages are stored with metadata (timestamp, user info, session context)
- **Session Management**: Each chat session is tracked with start/end times and analytics
- **Database Integration**: Primary storage in MySQL with localStorage fallback
- **Analytics**: Comprehensive analytics including user satisfaction, response times, and popular topics
- **Export Functionality**: ❌ **DISABLED** - Export functionality has been disabled for security reasons
- **Health Monitoring**: Database health checks and connection monitoring

### ✅ Automatic Storage
- **Messages**: Every chat message is automatically saved
- **Sessions**: Each conversation session is tracked
- **Metadata**: Response times, user agent, device type, etc.
- **Topics**: Automatic topic extraction from conversations

### ✅ Export Functionality
- **JSON**: Complete data with metadata
- **CSV**: Spreadsheet-compatible format
- **Text**: Human-readable conversation log
- **One-click download** directly from chatbot

### ✅ Analytics & Insights
- **Popular Topics**: Most discussed subjects
- **Common Questions**: Frequently asked questions
- **User Satisfaction**: Rating-based feedback
- **Peak Usage**: Time-based usage patterns
- **Response Times**: Performance metrics

### ✅ Session Management
- **Unique IDs**: Every user gets a persistent ID
- **Session Tracking**: Conversations grouped by session
- **Cross-device**: History follows users across devices
- **Auto-resume**: Conversations continue where left off

## 🚀 Setup Instructions

### 1. Database Setup

Run the SQL script to create necessary tables:

```bash
# Connect to your MySQL database and run:
mysql -u username -p database_name < scripts/create-chat-tables.sql
```

This creates the following tables:
- `chat_messages` - Individual message storage
- `chat_sessions` - Session information
- `chat_analytics_cache` - Cached analytics data
- `chat_feedback` - User ratings and feedback
- `chat_search_analytics` - Search query tracking

### 2. Environment Variables

Ensure your database connection is properly configured in `.env.local`:

```env
DB_ATS_HOST=your_host
DB_ATS_USER=your_username
DB_ATS_PASSWORD=your_password
DB_ATS_DATABASE=your_database
```

### 3. API Route Testing

Test the health endpoint:

```bash
curl http://localhost:3000/api/chat/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-10T10:30:00.000Z",
  "database": "connected"
}
```

## 🔧 Usage Guide

### For Users

1. **Chatting**: Simply use the chatbot normally - all messages are automatically saved
2. **Exporting**: Click the "Export" button in the chatbot header
3. **Rating**: Rate conversations using the star system
4. **History**: Previous conversations load automatically when reopening the chatbot

### For Developers

#### Saving Messages
```typescript
import { saveChatMessage } from '@/lib/chat-storage'

const message = {
  id: 'unique-id',
  text: 'Hello!',
  isBot: false,
  timestamp: new Date()
}

await saveChatMessage(message)
```

#### Getting History
```typescript
import { getChatHistory } from '@/lib/chat-storage'

const history = await getChatHistory(50) // Last 50 messages
```

#### Exporting Data
```typescript
import { exportChatHistory } from '@/lib/chat-storage'

const jsonData = await exportChatHistory('json')
const csvData = await exportChatHistory('csv')
const textData = await exportChatHistory('txt')
```

#### Session Management
```typescript
import { startNewChatSession, endChatSession } from '@/lib/chat-storage'

const sessionId = startNewChatSession()
endChatSession(5) // End with 5-star rating
```

## 📊 Database Schema

### chat_messages
```sql
- id (VARCHAR 36) - Unique message ID
- session_id (VARCHAR 36) - Session reference
- user_id (VARCHAR 36) - User reference
- text (TEXT) - Message content
- is_bot (BOOLEAN) - Whether message is from AI
- timestamp (TIMESTAMP) - When message was sent
- user_agent (TEXT) - Browser information
- language (VARCHAR 10) - User language
- region (VARCHAR 10) - User region (IND/INT)
- page (VARCHAR 255) - Page where chat occurred
- response_time (INT) - AI response time in ms
- tokens (INT) - Token count for AI responses
- confidence (DECIMAL) - AI confidence score
```

### chat_sessions
```sql
- id (VARCHAR 36) - Unique session ID
- user_id (VARCHAR 36) - User reference
- start_time (TIMESTAMP) - Session start
- end_time (TIMESTAMP) - Session end
- message_count (INT) - Number of messages
- total_tokens (INT) - Total tokens used
- average_response_time (DECIMAL) - Average response time
- user_satisfaction (TINYINT) - 1-5 rating
- topics (JSON) - Topics discussed
- resolved (BOOLEAN) - Whether issue was resolved
- device (VARCHAR 20) - Device type
- location (VARCHAR 100) - User location
```

## 📈 Analytics Dashboard

### Available Metrics

1. **Usage Statistics**
   - Total sessions and messages
   - Average session length
   - User satisfaction scores

2. **Popular Topics**
   - Registration questions
   - Test dates and fees
   - Eligibility criteria
   - University programs

3. **Performance Metrics**
   - Average response times
   - Peak usage hours
   - Response quality scores

4. **User Insights**
   - Device usage patterns
   - Regional differences
   - Conversation resolution rates

### API Endpoints

Get analytics data:
```bash
GET /api/chat/analytics?days=30
```

Response includes:
```json
{
  "totalSessions": 150,
  "totalMessages": 750,
  "averageSessionLength": 5.2,
  "popularTopics": [
    { "topic": "registration", "count": 45 },
    { "topic": "test-dates", "count": 38 }
  ],
  "userSatisfactionScore": 4.2,
  "responseTimeStats": {
    "average": 1250,
    "median": 980,
    "p95": 2100
  }
}
```

## 🔒 Privacy & Security

### Data Protection
- **Local Storage**: Fallback for offline functionality
- **Database Storage**: Encrypted connections required
- **User IDs**: Generated UUIDs, no personal information
- **Message Content**: Stored securely, access controlled

### Data Retention
- **Active Sessions**: Stored indefinitely
- **Inactive Users**: Data archived after 1 year
- **Analytics**: Aggregated data retained, individual messages purged
- **Exports**: User-controlled, no automatic sharing

### GDPR Compliance
- **Right to Access**: Users can export their data
- **Right to Deletion**: Clear chat functionality
- **Data Minimization**: Only necessary data collected
- **Consent**: Implicit through usage, clear privacy notice

## 🛠️ Maintenance

### Regular Tasks

1. **Database Cleanup**
   ```sql
   -- Remove old sessions (older than 1 year)
   DELETE FROM chat_sessions 
   WHERE start_time < DATE_SUB(NOW(), INTERVAL 1 YEAR);
   
   -- Remove orphaned messages
   DELETE FROM chat_messages 
   WHERE session_id NOT IN (SELECT id FROM chat_sessions);
   ```

2. **Analytics Cache Refresh**
   ```bash
   # Refresh analytics cache daily
   curl -X POST http://localhost:3000/api/chat/refresh-analytics
   ```

3. **Performance Monitoring**
   - Monitor response times
   - Check database storage usage
   - Review error logs

### Backup Strategy
- **Daily**: Database backup of chat tables
- **Weekly**: Full export of analytics data
- **Monthly**: Archive old conversation data

## 🐛 Troubleshooting

### Common Issues

1. **Messages Not Saving**
   - Check database connectivity
   - Verify table permissions
   - Review API logs

2. **Export Not Working**
   - Check localStorage fallback
   - Verify user permissions
   - Test file download functionality

3. **Analytics Missing**
   - Refresh analytics cache
   - Check database queries
   - Verify data aggregation

### Error Handling
- **Database Offline**: Falls back to localStorage
- **API Failures**: Graceful degradation
- **Export Errors**: User notification with retry option

## 🚀 Future Enhancements

### Planned Features
1. **Admin Dashboard**: Web interface for analytics
2. **Real-time Analytics**: Live usage monitoring
3. **Advanced Search**: Query conversation history
4. **AI Insights**: Automated conversation analysis
5. **Integration**: CRM and support ticket systems

### Performance Optimizations
1. **Database Indexing**: Optimize query performance
2. **Caching Layer**: Redis for frequent queries
3. **Compression**: Reduce storage requirements
4. **Archiving**: Automated old data management

---

## 💡 Summary

The chat storage system provides:

- ✅ **Automatic Storage**: Every conversation saved
- ✅ **Export Options**: JSON, CSV, and text formats
- ✅ **Analytics**: Comprehensive usage insights
- ✅ **Session Management**: Persistent user experience
- ✅ **Privacy Compliant**: GDPR-ready data handling
- ✅ **Performance Monitoring**: Response time tracking
- ✅ **Fallback Support**: Works offline with localStorage

This creates a professional chat experience with enterprise-level data management and analytics capabilities. 