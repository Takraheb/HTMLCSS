import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import express from 'express'

/**
 * Horizon Properties API.
 *
 * Keeps the enquiry trail (contact, viewing requests and newsletter sign-ups)
 * for the website. Deliberately dependency-light: Express plus a JSON file, so
 * the write path is real today and can be swapped for a database without
 * touching the client.
 */
const PORT = Number(process.env.PORT ?? 8000)
const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json')

const ENQUIRY_TYPES = new Set(['viewing', 'contact', 'newsletter'])
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '64kb' }))

const attempts = new Map()

function rateLimited(key) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

let writeQueue = Promise.resolve()

async function readAll() {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

/** Serialised appends so two concurrent requests cannot clobber the file. */
function append(record) {
  writeQueue = writeQueue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true })
    const all = await readAll()
    all.push(record)
    await writeFile(DATA_FILE, JSON.stringify(all, null, 2), 'utf8')
  })
  return writeQueue
}

function clean(value, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

app.get('/api/health', async (_req, res) => {
  const all = await readAll().catch(() => [])
  res.json({ ok: true, service: 'horizon-properties-api', enquiries: all.length })
})

app.post('/api/inquiries', async (req, res) => {
  const key = req.ip ?? 'unknown'
  if (rateLimited(key)) {
    res.status(429).json({ ok: false, error: 'Too many enquiries from this address. Please try again shortly.' })
    return
  }

  const body = req.body ?? {}
  const type = clean(body.type, 32)
  const email = clean(body.email, 200)

  if (!ENQUIRY_TYPES.has(type)) {
    res.status(400).json({ ok: false, error: 'Unknown enquiry type.' })
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
    return
  }

  const record = {
    id: randomUUID(),
    type,
    name: clean(body.name, 160),
    email,
    phone: clean(body.phone, 60),
    message: clean(body.message, 2000),
    preferredDate: clean(body.preferredDate, 40),
    propertyId: clean(body.propertyId, 40),
    propertyName: clean(body.propertyName, 160),
    receivedAt: new Date().toISOString(),
  }

  try {
    await append(record)
    res.status(201).json({ ok: true, id: record.id })
  } catch (error) {
    console.error('[api] failed to store enquiry', error)
    res.status(500).json({ ok: false, error: 'We could not record your enquiry. Please try again.' })
  }
})

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api] Horizon Properties API listening on http://0.0.0.0:${PORT}`)
})
