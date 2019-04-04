import { fromJS } from 'immutable'
import * as defs from '../../defs'

export default function notes(state=fromJS({}), action) {
    switch(action.type) {
        case defs.NOTE_FETCH_REQUESTED:
            return state.setIn([action.payload.noteId.toString(), "frontStatus"], defs.STATUS.REQUESTING)
        case defs.NOTE_FETCH_SUCCESS:
            return state.setIn([action.payload.noteId.toString(), "frontStatus"], defs.STATUS.SUCCESS)
        case defs.NOTE_FETCH_FAILED:
            return state.withMutations(s =>
                s.setIn([action.payload.noteId.toString(), "frontStatus"], defs.STATUS.FAILED)
                .setIn([action.payload.noteId.toString(), "error"], action.payload.error)
            )
        case defs.ADD_ENTITIES:
            return state.mergeWith((o,n) => o.merge(n) ,fromJS(action.payload.entities.notes))
        default:
            return state
    }
}