import * as defs from '../../defs'
import * as utils from './utils'

// --> ALL CATEGORIES
export const allCategoriesFetchRequested = utils.makeCreators(defs.ALL_CATEGORIES_FETCH_REQUESTED)
export const allCategoriesFetchSuccess = utils.makeCreators(defs.ALL_CATEGORIES_FETCH_SUCCESS)
export const allCategoriesFetchFailed = utils.makeCreators(defs.ALL_CATEGORIES_FETCH_FAILED, "error")

// --> FOLDERS
export const folderFetchRequested = utils.makeCreators(defs.FOLDER_FETCH_REQUESTED, "folderId")
export const folderFetchSuccess = utils.makeCreators(defs.FOLDER_FETCH_SUCCESS, "folderId")
export const folderFetchFailed = utils.makeCreators(defs.FOLDER_FETCH_FAILED, "folderId", "error")

export const generateFolderTOCS = utils.makeCreators(defs.GENERATE_FOLDER_TOCS, "folderId")

// --> NOTES
export const noteFetchRequested = utils.makeCreators(defs.NOTE_FETCH_REQUESTED, "noteId")
export const noteFetchSuccess = utils.makeCreators(defs.NOTE_FETCH_SUCCESS, "noteId")
export const noteFetchFailed = utils.makeCreators(defs.NOTE_FETCH_FAILED, "noteId", "error")

export const removeNoteBody = utils.makeCreators(defs.REMOVE_NOTE_BODY, "noteId")

export const generateNoteTOCRequested = utils.makeCreators(defs.GENERATE_NOTE_TOC_REQUESTED, "noteId")
export const generateNoteTOCSuccess = utils.makeCreators(defs.GENERATE_NOTE_TOC_SUCCESS, "noteId", "toc")
export const generateNoteTOCFailed = utils.makeCreators(defs.GENERATE_NOTE_TOC_FAILED, "noteId", "error")

// -> GENERIC ADD ENTITIES
export const addEntities = utils.makeCreators(defs.ADD_ENTITIES, "entities")
