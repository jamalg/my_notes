import React from 'react'

import { Link } from 'react-router-dom'

import './folders.css'


const TypeBadge = ({type}) => {
    switch(type) {
        case "Book":
            return <span className="badge badge-primary">{type}</span>
        case "Documentation":
            return <span className="badge badge-success">{type}</span>
        case "Other":
            return <span className="badge badge-warning">{type}</span>
        default:
            return <span className="badge badge-secondary">{type}</span>
    }
}

export const Folder = ({data: {type, name, imageUrl, notes}}) => (
    <div className="folder-card card">
        <img className="card-img-top" src={imageUrl} alt={name}/>
        <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <p className="card-text"><TypeBadge type={type}/></p>
            <ol className="folder-notes">
                {notes.map((note) => <li key={note.id}><Link to={`/notes/${note.id}`}>{note.title}</Link></li>)}
            </ol>
        </div>
    </div>
)