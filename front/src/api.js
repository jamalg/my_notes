import fetch from 'cross-fetch'

import { toCamelCaseObject } from './utils'

const backApi = process.env.REACT_APP_API_URL

const fetchBackApi = (endpoint) => {
    return fetch(`${backApi}/${endpoint}`)
    .then(response => {
        if (response.status !== 200) {
            return response.json()
            .then(json => {
                const error = json || { message: response.statusText}
                throw toCamelCaseObject(error)
            })
        } else {
            return response.json()
            .then(json => toCamelCaseObject(json))
        }
    })
}
export const fetchAllCategories = () => fetchBackApi("categories")
export const fetchFolder = (folderId) => fetchBackApi(`folders/${folderId}`)
export const fetchNote = (noteId) => fetchBackApi(`notes/${noteId}`)
