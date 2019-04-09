import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import Home from '../components/home'
import { getCategories, getCategoriesFetchStatus } from '../redux/selectors'


class HomeContainer extends React.Component {
    render() {
        return <Home categories={Object.values(this.props.categories)} status={this.props.status}/>
    }
}

const mapStateToProps = (state) => ({
    categories: getCategories(state),
    status: getCategoriesFetchStatus(state)
})

export default connect(mapStateToProps)(withImmutablePropsToJS(HomeContainer))