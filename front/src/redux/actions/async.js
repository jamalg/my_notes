import { normalize } from 'normalizr'
import toc from 'markdown-toc'

import * as schemas from '../schemas'
import * as sync from './sync'
import * as api from '../../api'


export function fetchAllCategories() {
    return (dispatch) => {
        dispatch(sync.allCategoriesFetchRequested())
        api.fetchAllCategories()
        .then(
            (categoriesData) => {
                const data = normalize(categoriesData, [ schemas.category ])

                dispatch(sync.addEntities(data.entities))
                dispatch(sync.allCategoriesFetchSuccess())
            },
            (error) => dispatch(sync.allCategoriesFetchFailed(error.message))
        )
        }
}

export function fetchFolder(folderId) {
    return (dispatch) => {
        dispatch(sync.folderFetchRequested(folderId))
        api.fetchFolder(folderId)
        .then(
            (folderData) => {
                const data = normalize(folderData, schemas.folder )

                dispatch(sync.addEntities(data.entities))
                dispatch(sync.folderFetchSuccess(folderId))
            },
            (error) => dispatch(sync.folderFetchFailed(folderId, error.message))
        )
        }
}

export function fetchNote(noteId) {
    return (dispatch) => {
        dispatch(sync.noteFetchRequested(noteId))
        api.fetchNote(noteId)
        .then(
            (noteData) => {
                const data = normalize(noteData, schemas.note )

                dispatch(sync.addEntities(data.entities))
                dispatch(sync.noteFetchSuccess(noteId))
            },
            (error) => dispatch(sync.noteFetchFailed(noteId, error.message))
        )
    }
}

export function generateNoteTOC(noteId) {
    return (dispatch) => {
        dispatch(sync.generateNoteTOCRequested(noteId))
        api.fetchNote(noteId)
        .then(
            (noteData) => {
                const noteBody = noteData.body
                const noteTOC = toc(noteBody).json
                dispatch(sync.generateNoteTOCSuccess(noteId, noteTOC))
            },
            (error) => dispatch(sync.generateNoteTOCFailed(noteId, error.message))
        )

    }
}