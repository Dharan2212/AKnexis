import mongoose from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'aknexis'

async function main() {
  console.log('Connecting...')
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME })

  const db = mongoose.connection.db!
  const outDir = path.join(process.cwd(), 'exports', new Date().toISOString().slice(0, 10))
  fs.mkdirSync(outDir, { recursive: true })

  const collections = ['users', 'leads', 'clients', 'projects', 'files', 'activity_logs']

  for (const col of collections) {
    const data = await db.collection(col).find({}).toArray()
    const outFile = path.join(outDir, `${col}.json`)
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2))
    console.log(`Exported ${data.length} documents from ${col} → ${outFile}`)
  }

  console.log(`\n✅ Export complete: ${outDir}`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Export failed:', err)
  process.exit(1)
})
