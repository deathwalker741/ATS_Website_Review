-- Chat Storage Database Tables for Ei ATS
-- NOTE: Do not hardcode or share credentials in this file. Use environment variables and secure secrets management.

-- Ensure you're connected to the correct database before running this script
-- Example: USE ats_website;

-- Table for storing individual chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36),
    user_id VARCHAR(36),
    text TEXT NOT NULL,
    is_bot BOOLEAN NOT NULL DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    language VARCHAR(10),
    region VARCHAR(10),
    page VARCHAR(255),
    response_time INT, -- in milliseconds
    tokens INT,
    confidence DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_is_bot (is_bot)
);

-- Table for storing chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    message_count INT DEFAULT 0,
    total_tokens INT,
    average_response_time DECIMAL(8,2), -- in milliseconds
    user_satisfaction TINYINT, -- 1-5 rating
    topics JSON,
    resolved BOOLEAN DEFAULT FALSE,
    user_agent TEXT,
    device VARCHAR(20),
    location VARCHAR(100),
    referrer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_start_time (start_time),
    INDEX idx_resolved (resolved),
    INDEX idx_user_satisfaction (user_satisfaction)
);

-- Table for storing chat analytics (optional - for caching)
CREATE TABLE IF NOT EXISTS chat_analytics_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_range VARCHAR(20) NOT NULL, -- e.g., '7days', '30days', '90days'
    total_sessions INT DEFAULT 0,
    total_messages INT DEFAULT 0,
    average_session_length DECIMAL(6,2) DEFAULT 0,
    popular_topics JSON,
    common_questions JSON,
    user_satisfaction_score DECIMAL(3,2) DEFAULT 0,
    peak_usage_hours JSON,
    response_time_stats JSON,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_date_range (date_range)
);

-- Table for storing user feedback on conversations
CREATE TABLE IF NOT EXISTS chat_feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    rating TINYINT NOT NULL, -- 1-5 rating
    feedback_text TEXT,
    helpful_messages JSON, -- IDs of messages user found helpful
    categories JSON, -- What the conversation was about
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_rating (rating),
    INDEX idx_resolved (resolved)
);

-- Table for tracking popular search terms and failed queries
CREATE TABLE IF NOT EXISTS chat_search_analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(36),
    user_id VARCHAR(36),
    query TEXT NOT NULL,
    found_answer BOOLEAN DEFAULT FALSE,
    response_quality TINYINT, -- 1-5 if feedback provided
    topic_category VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_found_answer (found_answer),
    INDEX idx_topic_category (topic_category),
    INDEX idx_timestamp (timestamp)
);

-- View for easy analytics queries
CREATE OR REPLACE VIEW chat_session_summary AS
SELECT 
    s.id,
    s.user_id,
    s.start_time,
    s.end_time,
    s.message_count,
    s.user_satisfaction,
    s.resolved,
    s.device,
    COUNT(m.id) as actual_message_count,
    AVG(CASE WHEN m.is_bot = 0 THEN m.response_time END) as avg_user_response_time,
    MIN(m.timestamp) as first_message_time,
    MAX(m.timestamp) as last_message_time,
    TIMESTAMPDIFF(MINUTE, MIN(m.timestamp), MAX(m.timestamp)) as session_duration_minutes
FROM chat_sessions s
LEFT JOIN chat_messages m ON s.id = m.session_id
GROUP BY s.id;

-- Indexes for better performance
CREATE INDEX idx_messages_session_timestamp ON chat_messages(session_id, timestamp);
CREATE INDEX idx_sessions_user_start ON chat_sessions(user_id, start_time);

-- Show tables to confirm creation
SHOW TABLES LIKE 'chat_%';

-- Insert some sample data for testing (optional)
/*
INSERT INTO chat_sessions (id, user_id, start_time, message_count, device, resolved) VALUES
('sample-session-1', 'user-123', NOW() - INTERVAL 1 HOUR, 5, 'desktop', TRUE),
('sample-session-2', 'user-456', NOW() - INTERVAL 2 HOURS, 3, 'mobile', FALSE);

INSERT INTO chat_messages (id, session_id, user_id, text, is_bot, timestamp) VALUES
('msg-1', 'sample-session-1', 'user-123', 'What are the test dates?', FALSE, NOW() - INTERVAL 1 HOUR),
('msg-2', 'sample-session-1', 'user-123', 'Test dates for India 2024: November 28-30, International 2025: March 25-29', TRUE, NOW() - INTERVAL 59 MINUTE),
('msg-3', 'sample-session-2', 'user-456', 'How much does the test cost?', FALSE, NOW() - INTERVAL 2 HOUR),
('msg-4', 'sample-session-2', 'user-456', 'For India: INR 1700-2700 per subject. For International: AED 170-300 per subject.', TRUE, NOW() - INTERVAL 119 MINUTE);
*/ 