import { fromJS } from 'immutable'
import * as defs from '../../defs'

export default function categories(state=fromJS({}), action) {
    switch(action.type) {
        case defs.ADD_ENTITIES:
            return state.merge(fromJS(action.payload.entities.categories))
        default:
            return state
    }
}