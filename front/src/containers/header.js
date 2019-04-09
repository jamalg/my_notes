import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import Header  from '../components/header'
import { fetchAllCategories } from '../redux/actions/async'
import { getCategories, getCategoriesFetchStatus} from '../redux/selectors'


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.fetchAllCategories()
    }

    render() {
        return <Header categories={Object.values(this.props.categories)} status={this.props.status}/>
    }
}

const mapStateToProps = (state) => ({
    categories: getCategories(state),
    status: getCategoriesFetchStatus(state)
})

const mapDispatchToProps = { fetchAllCategories }

export default connect(mapStateToProps, mapDispatchToProps)(withImmutablePropsToJS(HeaderContainer))