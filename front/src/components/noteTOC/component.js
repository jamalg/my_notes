import React from 'react'

import { Link } from 'react-router-dom'

import './style.css'

const removeEmbbededLinks = (heading) => heading.replace(/\[([\w\d :-`'\.]+)\]\([\w\d:/?\.=&#-_]*\)/, "$1")

export const NoteTOC = ({toc, baseUrl}) => (
    <div className="tocs">
        {toc.map(heading => {
            return (
                <div className="note-toc-heading" data-toc-level={heading.lvl}>
                    <Link to={`${baseUrl}#${heading.slug}`}>
                        {removeEmbbededLinks(heading.content)}
                    </Link>
                </div>)
            })
        }
    </div>
)