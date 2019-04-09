import React from 'react';

import { Route } from 'react-router-dom'

import Home from './containers/home'
import Category from './containers/category'
import Folder from './containers/folder'
import Note from './containers/note'
import Header from './containers/header'
import './App.css';


export default function() {
  return (
    <div className="app-body w-100">
      <div className="app-wrapper container d-flex flex-column">
          <Route path="/" component={Header} />
          <Route exact path="/" component={Home} />
          <Route exact path="/categories/:categoryId" component={Category} />
          <Route exact path="/categories/:categoryId/folders/:folderId" component={Folder} />
          <Route exact path="/categories/:categoryId/folders/:folderId/notes/:noteId" component={Note} />
      </div>
    </div>
  )
}
