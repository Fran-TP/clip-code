import type { Languages } from '@lib/types'
import type { FuseResult } from 'fuse.js'

export const extractLanguages = (items: FuseResult<Languages>[]) => {
  return items.map(({ item: language }) => language)
}
