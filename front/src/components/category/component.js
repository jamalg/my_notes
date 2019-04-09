import React from 'react'

import { Link } from 'react-router-dom'

import './style.css'

const NoteCard = ({ id, title, categoryId, folderId }) => (
    <div className="note-card">
        <div className="note-title">
            <Link to={`/categories/${categoryId}/folders/${folderId}/notes/${id}`} >{title}</Link>
        </div>
    </div>
)

const FolderCard = ({name, imageUrl, notes, categoryId}) => (
    <div className="folder-card">
        <img className="folder-card-image" src={imageUrl} alt={`Illustration for ${name} folder`} />
        <div className="folder-card-title">{name}</div>
        <div className="notes">
            {notes.map(note => <NoteCard key={note.id} {...note} categoryId={categoryId}/>)}
        </div>
    </div>
)

export const Category = ({ category: {id, folders} }) => (
    <div className="category-wrapper">
        <div className="folders">
            {Object.values(folders).map(folder => (
                <Link key={folder.id} to={`/categories/${id}/folders/${folder.id}`}>
                    <FolderCard {...folder} />
                </Link>
            ))}
        </div>
    </div>
)