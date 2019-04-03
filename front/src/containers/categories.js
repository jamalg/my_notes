import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import CategoriesView from '../components/categories'
import { fetchAllCategories } from '../redux/actions/async'
import { getHydratedCategories, getCategoriesFetchStatus } from '../redux/selectors'


class CategoriesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchAllCategories()
    }

    render() {
        return <CategoriesView categories={Object.values(this.props.categories)} status={this.props.status}/>
    }
}

const mapStateToProps = (state) => ({
    status: getCategoriesFetchStatus(state),
    categories: getHydratedCategories(state),
})

const mapDispatchToProps = { fetchAllCategories }

export default connect(mapStateToProps, mapDispatchToProps)(withImmutablePropsToJS(CategoriesContainer))