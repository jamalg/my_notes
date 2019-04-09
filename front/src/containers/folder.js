import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import * as defs from '../defs'
import Folder from '../components/folder'
import { generateNoteTOC } from '../redux/actions/async'
import { getFolder, getCategoriesFetchStatus } from '../redux/selectors'


class FolderContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            generatedTOC: false
        }
    }
    componentDidMount() {
        if (this.props.status === defs.STATUS.SUCCESS && this.state.generatedTOC === false) {
            this.setState({generatedTOC: true})
            this.props.folder.notes.forEach(note => this.props.generateNoteTOC(note.id))
        }
    }
    componentDidUpdate() {
        if (this.props.status === defs.STATUS.SUCCESS && this.state.generatedTOC === false) {
            this.setState({generatedTOC: true})
            this.props.folder.notes.forEach(note => this.props.generateNoteTOC(note.id))
        }
    }
    render() {
        return <Folder folder={this.props.folder} status={this.props.status} generateNoteTOC={generateNoteTOC}/>
    }
}

const mapStateToProps = (state, ownProps) => ({
    folder: getFolder(state, ownProps.match.params.folderId),
    status: getCategoriesFetchStatus(state)
})

const mapDispatchToProps = { generateNoteTOC }

export default connect(mapStateToProps, mapDispatchToProps)(withImmutablePropsToJS(FolderContainer))