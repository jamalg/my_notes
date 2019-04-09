import React from 'react'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import Category from '../components/category'
import { getCategory, getCategoriesFetchStatus } from '../redux/selectors'


class CategoryContainer extends React.Component {
    constructor(props) {
        super(props)
        this.categoryId = this.props.match.params.categoryId
    }
    render() {
        return <Category category={this.props.category} status={this.props.status}/>
    }
}

const mapStateToProps = (state, ownProps) => ({
    category: getCategory(state, ownProps.match.params.categoryId),
    status: getCategoriesFetchStatus(state)
})

export default connect(mapStateToProps)(withImmutablePropsToJS(CategoryContainer))