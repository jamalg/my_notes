import React from 'react'

import Remarkable from 'remarkable'
import hljs from 'highlight.js';


import * as defs from '../defs'
import './note.css'
import 'highlight.js/styles/solarized-dark.css';

const NoteRequesting = () => (
    <div className="note-requesting-wrapper bg-white rounded-lg p-5">
        <div className="row">
            <p className="col lead text-center">
                Retreiving data from server !
            </p>
        </div>
        <div className="row justify-content-center">
            <div className="col-1-sm text-primary spinner-grow mx-1"></div>
            <div className="col-1-sm text-secondary spinner-grow mx-1"></div>
            <div className="col-1-sm text-success spinner-grow mx-1"></div>
            <div className="col-1-sm text-danger spinner-grow mx-1"></div>
            <div className="col-1-sm text-warning spinner-grow mx-1"></div>
            <div className="col-1-sm text-info spinner-grow mx-1"></div>
            <div className="col-1-sm text-dark spinner-grow mx-1"></div>
        </div>
    </div>
)

const NoteFailed = () => (
    <div className="note-failed-wrapper bg-white rounded-lg p-5">
        <div className="row justify-content-center">
            <p className="col lead text-danger text-center">
                Oops... something seems wrong
            </p>
        </div>
    </div>
)

const NoteSuccess = ({ body }) => {
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
    return (
        <div className="note-success-wrapper rounded-lg p-5">
            <div
                dangerouslySetInnerHTML={{__html: md.render(body)}}
            >
            </div>
        </div>
    )
}


export default class NoteView extends React.Component {
    getNoteContent() {
        const status = this.props.status
        switch(status) {
            case defs.STATUS.REQUESTING:
                return <NoteRequesting />
            case defs.STATUS.SUCCESS:
                return <NoteSuccess {...this.props.note}/>
            case defs.STATUS.FAILED:
                return <NoteFailed />
            default:
                return ""
        }
    }
    render() {
        return (
            <div className="note-body w-100">
                <div className="note-wrapper container bg-white d-flex flex-column">
                    <nav className="navbar navbar-expand navbar-light align-items-baseline">
                        <div className="navbar-brand mr-auto" style={{fontSize: "2.5em", fontWeight: "100"}}>
                            <span style={{fontWeight: "600"}}>N</span>otes
                        </div>
                        <div className="navbar-text" style={{fontSize: "1.5em"}}>
                            <span>Folder name</span>
                        </div>
                    </nav>
                    {this.getNoteContent()}
                </div>
            </div>
        )
    }
}