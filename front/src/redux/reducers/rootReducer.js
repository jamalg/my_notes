import { combineReducers } from 'redux-immutable'
import allCategories from './allCategories'
import categories from './categories'
import folders from './folders'
import notes from './notes'

export default combineReducers({categories, folders, notes, allCategories})
