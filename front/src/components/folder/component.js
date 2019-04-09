import React from 'react'

import { Link } from 'react-router-dom'
import { NoteTOC } from '../noteTOC'

import './style.css'

const NoteCard = ({title, tags, toc, baseUrl}) => (
    <div className="folder-note-card">
        <div className="folder-note-card-title">{title}</div>
                <div className="folder-note-toc bg-light p-2">
                    {toc && <NoteTOC toc={toc} baseUrl={baseUrl} />}
                </div>
                <div className="folder-note-tags">
                    {tags.map(tag => <span key={tag} className="badge badge-pill badge-primary mx-1">{tag}</span>)}
                </div>
    </div>
)

export const Folder = ({ folder: {id, name, notes, categoryId} }) => (
    <div className="folder-wrapper">
        <h1 className="folder-name">{name}</h1>
        <div className="folder-notes">
            {notes.map(note => (
                <Link key={note.id} to={`/categories/${categoryId}/folders/${id}/notes/${note.id}`}>
                    <NoteCard {...note} baseUrl={`/categories/${categoryId}/folders/${id}/notes/${note.id}`} />
                </Link>
            ))}
        </div>
    </div>
)