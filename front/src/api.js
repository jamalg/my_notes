import fetch from 'cross-fetch'

import { toCamelCaseObject } from './utils'

const applicationJSON = "application/json"
const backApi = process.env.REACT_APP_API_URL

const fetchBackApi = (endpoint) => {
    return fetch(`${backApi}/${endpoint}`)
    .then(response => {
        if (response.status !== 200) {
            if (response.headers.get("content-type") === applicationJSON) {
                return response.json()
                .then(json => {
                    throw toCamelCaseObject(json)
                })
            }
            const error = {message: response.statusText}
            throw error
        } else {
            return response.json()
            .then(json => toCamelCaseObject(json))
        }
    })
}
export const fetchAllCategories = () => fetchBackApi("categories")
export const fetchFolder = (folderId) => fetchBackApi(`folders/${folderId}`)
export const fetchNote = (noteId) => fetchBackApi(`notes/${noteId}`)
