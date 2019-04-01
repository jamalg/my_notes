import { fromJS } from 'immutable'
import * as defs from '../../defs'

export default function categories(state=fromJS({}), action) {
    switch(action.type) {
        case defs.ALL_CATEGORIES_FETCH_REQUESTED:
            return state.set("frontStatus", defs.STATUS.REQUESTING)
        case defs.ALL_CATEGORIES_FETCH_SUCCESS:
            return state.set("frontStatus", defs.STATUS.SUCCESS)
        case defs.ALL_CATEGORIES_FETCH_FAILED:
            return state.withMutations(s =>
                s.set("frontStatus", defs.STATUS.FAILED)
                 .set("error", action.payload.error)
            )
        case defs.ADD_ENTITIES:
            return state.merge(fromJS(action.payload.entities.categories))
        default:
            return state
    }
}