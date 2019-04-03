import React from 'react';

import { Switch, Route } from 'react-router-dom'

import CategoriesView from './containers/categories'
import './App.css';


export default function() {
  return (
      <Switch>
        <Route path="/" component={CategoriesView}/>
      </Switch>
  )
}
