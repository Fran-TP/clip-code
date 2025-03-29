import type { FuseResult } from 'fuse.js'

export const normalizeCategories = (items: FuseResult<string>[]) => {
  return items.map(({ item }) => item)
}
