import React from 'react';
import { connect } from 'react-redux'

import * as async from './redux/actions/async'

import './App.css';

class App extends React.Component {
  componentDidMount() {
    // Testing data fetch and redux flow
    this.props.dispatch(async.fetchAllCategories())
    this.props.dispatch(async.fetchFolder(1))
    this.props.dispatch(async.fetchNote(1))
  }

  render() {
    return (
      <div style={{margin: "auto"}}>
        Assalamou Alaykoum !
      </div>
    );
  }
}

export default connect(null)(App);
