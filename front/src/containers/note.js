import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import * as defs from '../defs'
import NoteView from '../components/note'
import { fetchNote } from '../redux/actions/async'
import { removeNoteBody } from '../redux/actions/sync'
import { getNote } from '../redux/selectors'


class NoteContainer extends React.Component {
    constructor(props) {
        super(props)
        this.noteId = this.props.match.params.noteId
        this.state = {
            init: defs.STATUS.REQUESTING
        }
    }
    componentDidMount() {
        this.props.fetchNote(this.noteId)
    }

    componentWillUnmount() {
        this.props.removeNoteBody(this.noteId)
    }

    render() {
        const note = this.props.note
        const status = ( note && note.frontStatus ) || this.state.init
        return <NoteView note={note} status={status}/>
    }
}

const mapStateToProps = (state, ownProps) => ({
    note: getNote(state, ownProps.match.params.noteId),
})

const mapDispatchToProps = { fetchNote, removeNoteBody }

export default connect(mapStateToProps, mapDispatchToProps)(withImmutablePropsToJS(NoteContainer))