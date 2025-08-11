// Simple DB connectivity verification script
// Usage: node scripts/verify-db.js

const path = require('path')
const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

// Load env files (.env first, then .env.local to override)
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function testDbConnection(label, cfg) {
  const required = ['host', 'port', 'user', 'password', 'database']
  for (const key of required) {
    if (!cfg[key]) {
      console.log(`${label}: missing required config value for ${key}`)
      return { ok: false, error: `Missing ${key}` }
    }
  }

  let pool
  try {
    pool = mysql.createPool({
      host: cfg.host,
      port: Number(cfg.port || 3306),
      user: cfg.user,
      password: cfg.password,
      database: cfg.database,
      charset: 'utf8mb4',
      timezone: '+05:30',
      connectionLimit: 2,
    })
    const [rows] = await pool.execute('SELECT 1 AS ok')
    await pool.end()
    console.log(`${label}: OK ->`, rows)
    return { ok: true }
  } catch (err) {
    if (pool) {
      try { await pool.end() } catch (_) {}
    }
    console.error(`${label}: FAILED ->`, err && err.message ? err.message : err)
    return { ok: false, error: err && err.message ? err.message : String(err) }
  }
}

async function main() {
  const atsCfg = {
    host: process.env.DB_ATS_HOST,
    port: process.env.DB_ATS_PORT,
    user: process.env.DB_ATS_USER,
    password: process.env.DB_ATS_PASSWORD,
    database: process.env.DB_ATS_DATABASE,
  }

  const schoolCfg = {
    host: process.env.DB_SCHOOL_HOST,
    port: process.env.DB_SCHOOL_PORT,
    user: process.env.DB_SCHOOL_USER,
    password: process.env.DB_SCHOOL_PASSWORD,
    database: process.env.DB_SCHOOL_DATABASE,
  }

  console.log('Verifying database connectivity using environment variables...')
  const ats = await testDbConnection('ATS DB', atsCfg)
  const school = await testDbConnection('School DB', schoolCfg)

  const ok = ats.ok && school.ok
  if (!ok) {
    console.log('Result: One or more database connections failed.')
    process.exit(1)
  }
  console.log('Result: Both database connections are healthy.')
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})


