import { schema } from 'normalizr'

export const note = new schema.Entity('notes')
export const folder = new schema.Entity('folders', {notes: [note]})
export const category = new schema.Entity('categories', {folders: [folder]})
