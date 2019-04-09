import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import * as defs from '../defs'
import Note  from '../components/note'
import { fetchNote, generateNoteTOC } from '../redux/actions/async'
import { removeNoteBody } from '../redux/actions/sync'
import { getNote, getFolderName, getNoteCategoryId } from '../redux/selectors'


class NoteContainer extends React.Component {
    constructor(props) {
        super(props)
        this.noteId = this.props.match.params.noteId
        this.state = {
            init: defs.STATUS.REQUESTING,
            generatedTOC: false
        }
    }
    componentDidMount() {
        this.props.fetchNote(this.noteId)

        if (this.props.note && this.props.note.frontStatus === defs.STATUS.SUCCESS && this.state.generatedTOC === false) {
            this.setState({generatedTOC: true})
            this.props.generateNoteTOC(this.noteId)
        }
    }
    componentDidUpdate() {

        if (this.props.note && this.props.note.frontStatus === defs.STATUS.SUCCESS && this.state.generatedTOC === false) {
            this.setState({generatedTOC: true})
            this.props.generateNoteTOC(this.noteId)
        }
    }

    componentWillUnmount() {
        this.props.removeNoteBody(this.noteId)
    }

    render() {
        const categoryId = this.props.categoryId
        const folderName = this.props.folderName
        const note = this.props.note
        const status = ( note && note.frontStatus ) || this.state.init
        return <Note note={note} categoryId={categoryId} folderName={folderName} status={status}/>
    }
}

const mapStateToProps = (state, ownProps) => ({
    note: getNote(state, ownProps.match.params.noteId),
    folderName: getFolderName(state, ownProps.match.params.noteId),
    categoryId: getNoteCategoryId(state, ownProps.match.params.noteId),
})

const mapDispatchToProps = { fetchNote, removeNoteBody, generateNoteTOC }

export default connect(mapStateToProps, mapDispatchToProps)(withImmutablePropsToJS(NoteContainer))