import React from 'react'

import { Link } from 'react-router-dom'
import Remarkable from 'remarkable'
import hljs from 'highlight.js';

import { NoteTOC } from '../noteTOC'
import { withHeadingIds } from '../../utils'

import './style.css'
import 'highlight.js/styles/solarized-dark.css';

const md = new Remarkable({
  langPrefix: "hljs language-",
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return '';
  }
})
md.use(withHeadingIds)

export const Note = ({ note: { body, title, folderId, toc }, categoryId, folderName }) => (
    <div className="note-wrapper">
        <header className="note-header">
            <div className="note-folder-main-link">
              <Link to={`/categories/${categoryId}/folders/${folderId}`}>{folderName}</Link>
            </div>
            <h1>{title}</h1>
        </header>
        <article className="note-content">
            <aside
              className="note-toc bg-light mx-auto float-md-right ml-md-3">
              {toc && <NoteTOC toc={toc} baseUrl="" />}
            </aside>
            <div
                className="note-body"
                dangerouslySetInnerHTML={{__html: md.render(body)}}
            >
            </div>
        </article>
    </div>
)