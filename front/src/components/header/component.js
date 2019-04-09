import React from 'react'

import { Link, NavLink } from 'react-router-dom'

import './style.css'

const Brand = () => (
    <div className="main-brand"><span style={{fontWeight: 600}}>N</span>otes</div>
)

export const Header = ({categories}) => (
    <header className="main-header">
        <div className="navbar navbar-expand-md navbar-light">
            <div className="navbar-brand">
                <Link to="/">
                    <Brand/>
                </Link>
            </div>
            <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#main-navbar-nav"
                aria-controls="main-navbar-nav" aria-expanded={false} aria-label="Toggle Category Navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="main-navbar-nav" className="collapse navbar-collapse">
                <nav className="navbar-nav ml-auto text-center">
                    {categories.map((category) => (
                        <NavLink
                            key={category.id}
                            to={`/categories/${category.id}`}
                            className="nav-item nav-link"
                        >
                            <span className="main-navbav-nav-text">{category.name}</span>
                        </NavLink>
                        )
                    )}
                </nav>
            </div>
        </div>
    </header>

)