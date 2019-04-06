import React from 'react';

import { Switch, Route } from 'react-router-dom'

import CategoriesView from './containers/categories'
import NoteView from './containers/note'
import './App.css';


export default function() {
  return (
      <Switch>
        <Route path="/notes/:noteId" component={NoteView}/>
        <Route path="/" component={CategoriesView}/>
      </Switch>
  )
}
