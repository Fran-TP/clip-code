import Database from '@tauri-apps/plugin-sql'

const loadDatabase = async () => {
  try {
    return await Database.load('sqlite:clipCode.db')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to initialize database: ${message}`)
  }
}

export const db = await loadDatabase()
