import { normalize } from 'normalizr'

import * as schemas from '../schemas'
import * as sync from './sync'
import * as api from '../../api'


export function fetchAllCategories() {
    return (dispatch) => {
        dispatch(sync.allCategoriesFetchRequested())
        api.fetchAllCategories()
        .then(
            (categoriesData) => {
                dispatch(sync.allCategoriesFetchSuccess(categoriesData))
                const data = normalize(categoriesData, [ schemas.category ])
                dispatch(sync.addEntities(data.entities))
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
                dispatch(sync.folderFetchSuccess(folderId, folderData))
                const data = normalize(folderData, schemas.folder )
                dispatch(sync.addEntities(data.entities))
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
                dispatch(sync.noteFetchSuccess(noteId, noteData))
                const data = normalize(noteData, schemas.note )
                dispatch(sync.addEntities(data.entities))
            },
            (error) => dispatch(sync.noteFetchFailed(noteId, error.message))
        )
    }
}
