import * as defs from '../../defs'
import * as utils from './utils'

// --> CATEGORIES
export const allCategoriesFetchRequested = utils.makeCreators(defs.ALL_CATEGORIES_FETCH_REQUESTED)
export const allCategoriesFetchSuccess = utils.makeCreators(defs.ALL_CATEGORIES_FETCH_SUCCESS)
export const allCategoriesFetchFailed = utils.makeCreators(defs.ALL_CATEGORIES_FETCH_FAILED, "error")

// --> FOLDERS
export const folderFetchRequested = utils.makeCreators(defs.FOLDER_FETCH_REQUESTED, "folderId")
export const folderFetchSuccess = utils.makeCreators(defs.FOLDER_FETCH_SUCCESS, "folderId")
export const folderFetchFailed = utils.makeCreators(defs.FOLDER_FETCH_FAILED, "folderId", "error")

// --> NOTES
export const noteFetchRequested = utils.makeCreators(defs.NOTE_FETCH_REQUESTED, "noteId")
export const noteFetchSuccess = utils.makeCreators(defs.NOTE_FETCH_SUCCESS, "noteId")
export const noteFetchFailed = utils.makeCreators(defs.NOTE_FETCH_FAILED, "noteId", "error")
export const removeNoteBody = utils.makeCreators(defs.REMOVE_NOTE_BODY, "noteId")

// -> GENERIC ADD ENTITIES
export const addEntities = utils.makeCreators(defs.ADD_ENTITIES, "entities")
