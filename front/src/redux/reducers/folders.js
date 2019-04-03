import { fromJS } from 'immutable'
import * as defs from '../../defs'

export default function folders(state=fromJS({}), action) {
    switch(action.type) {
        case defs.FOLDER_FETCH_REQUESTED:
            return state.setIn([action.payload.folderId.toString(), "frontStatus"], defs.STATUS.REQUESTING)
        case defs.FOLDER_FETCH_SUCCESS:
            return state.setIn([action.payload.folderId.toString(), "frontStatus"], defs.STATUS.SUCCESS)
        case defs.FOLDER_FETCH_FAILED:
            return state.withMutations(s =>
                s.setIn([action.payload.folderId.toString(), "frontStatus"], defs.STATUS.FAILED)
                 .setIn([action.payload.folderId.toString(), "error"], action.payload.error)
            )
        case defs.ADD_ENTITIES:
            return state.mergeWith((o,n) => o.merge(n) ,fromJS(action.payload.entities.folders))
        default:
            return state
    }
}