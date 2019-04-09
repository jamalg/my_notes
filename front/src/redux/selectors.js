import { denormalize } from 'normalizr'

import * as schemas from './schemas'

export const getCategories = (state) => denormalize( state.get("categories"), [ schemas.category ] , state)
export const getCategoriesFetchStatus = (state) => state.getIn(["allCategories", "frontStatus"])

export const getCategory = (state, categoryId) => denormalize(categoryId, schemas.category, state )
export const getFolder = (state, folderId) => denormalize(folderId, schemas.folder, state )
export const getNote = (state, noteId) => state.getIn(["notes", noteId])

export const getFolderName = (state, noteId) => {
    const folderId = state.getIn(["notes", noteId, "folderId"])
    return state.getIn(["folders", folderId && folderId.toString(), "name"])
}
export const getNoteCategoryId = (state, noteId) => {
    const folderId = state.getIn(["notes", noteId, "folderId"])
    return state.getIn(["folders", folderId && folderId.toString(), "categoryId"])
}