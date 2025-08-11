#!/usr/bin/env node
/**
 * Script to help set up environment variables for the ATS website
 * This script will show you what needs to be added to your .env.local file
 */

console.log('🔧 ATS Website Environment Setup Helper\n');

console.log('📝 Add these environment variables to your .env.local file:\n');

console.log('# Database Configuration for ATS Website (forms, chat storage)');
console.log('DB_ATS_HOST=your_ats_db_host');
console.log('DB_ATS_PORT=3306');
console.log('DB_ATS_USER=your_ats_db_user');
console.log('DB_ATS_PASSWORD=your_ats_database_password_here');
console.log('DB_ATS_DATABASE=ats_website');
console.log('');

console.log('# Database Configuration for School Admin Login (legacy system)');
console.log('DB_SCHOOL_HOST=your_school_db_host');
console.log('DB_SCHOOL_PORT=3306');
console.log('DB_SCHOOL_USER=your_school_db_user');
console.log('DB_SCHOOL_PASSWORD=your_school_password_here');
console.log('DB_SCHOOL_DATABASE=educatio_educat');
console.log('');

console.log('# JWT Secret for Authentication');
console.log('JWT_SECRET=your_strong_jwt_secret_here');
console.log('');

console.log('# Authentication Password for School Login');
console.log('SCHOOL_AUTH_PASSWORD=your_secure_school_password_here');
console.log('');

console.log('💡 Steps to complete setup:');
console.log('1. Create/update your .env.local file in the project root');
console.log('2. Copy the environment variables above into the file');
console.log('3. Replace placeholder values with actual credentials');
console.log('4. Restart your development server');
console.log('5. Test the chat functionality');
console.log('');

console.log('🔍 Current environment check:');
console.log('DB_ATS_HOST:', process.env.DB_ATS_HOST || '❌ Not set');
console.log('DB_ATS_USER:', process.env.DB_ATS_USER || '❌ Not set');
console.log('DB_ATS_PASSWORD:', process.env.DB_ATS_PASSWORD ? '✅ Set' : '❌ Not set');
console.log('DB_ATS_DATABASE:', process.env.DB_ATS_DATABASE || '❌ Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('SCHOOL_AUTH_PASSWORD:', process.env.SCHOOL_AUTH_PASSWORD ? '✅ Set' : '❌ Not set');
console.log('');

const missingVars = [];
if (!process.env.DB_ATS_PASSWORD) missingVars.push('DB_ATS_PASSWORD');
if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
if (!process.env.SCHOOL_AUTH_PASSWORD) missingVars.push('SCHOOL_AUTH_PASSWORD');

if (missingVars.length > 0) {
  console.log('⚠️  IMPORTANT: Missing environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('   Please add them to your .env.local file for security.');
} 