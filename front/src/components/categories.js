import React from 'react'

import { Folder } from './folders'
import * as defs from '../defs'
import './categories.css'

const CategorieRequesting = () => (
    <div className="categories-requesting-wrapper m-auto">
        <div className="row">
            <p className="col lead text-center">
                Retreiving data from server !
            </p>
        </div>
        <div className="row">
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

const CategoriesFailed = () => (
    <div className="categories-failed-wrapper m-auto">
        <div className="row">
            <p className="col lead text-danger">
                Oops... something seems wrong
            </p>
        </div>
    </div>
)

const Category = ({ category }) => {
    return (
        <div className="folders-grid">
            {category.folders.map(folder => <Folder key={folder.id} data={folder}/>)}
        </div>
        )
    }

class CategoriesSuccess extends React.Component {
    categoryTab(category, isActive) {
        return (
            <a
                key={category.id}
                id={`link-${category.id}`}
                className={`categories-nav nav-item nav-link pl-0 ${isActive ? "active": ""}`}
                data-toggle="pill"
                href={`#tab-${category.id}`}
                role="tab"
                aria-controls={`tab-${category.id}`}
                aria-expanded={isActive}
                >
                <span className="categories-nav-text">{category.name}</span>
            </a>
        )
    }
    categoryContent(category, isActive) {
        return (
            <div
                key={category.id}
                className={`tab-pane fade ${isActive ? "show active" : ""}`}
                id={`tab-${category.id}`}
                role="tabpanel"
                aria-labelledby={`link-${category.id}`}
            >
                <Category category={category}/>
            </div>
        )
    }


    render() {
        const categories = this.props.categories
        return (
            <div className="categories-success-wrapper">
                <div className="row">
                    <div className="navbar navbar-expand-md navbar-light col-md-3 order-md-1 align-self-start">
                        <button
                            type="button"
                            className="navbar-toggler ml-auto"
                            data-toggle="collapse"
                            data-target="#categories-nav"
                            aria-controls="categories-nav"
                            aria-expanded={false}
                            aria-label="Toggle Categories"
                            >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="categories-nav" role="tablist" className="collapse navbar-collapse">
                            <nav className="nav d-flex flex-column text-right w-100">
                                {categories.map((category, index) => this.categoryTab(category, index === 0))}
                            </nav>
                        </div>
                    </div>
                    <div className="tab-content col-md-9 mt-2">
                        {categories.map((category, index) => this.categoryContent(category, index === 0)
                        )}
                    </div>
                </div>
            </div>
        )

    }
}

export default class CategoriesView extends React.Component {
    getBody() {
        const status = this.props.status
        switch(status) {
            case defs.STATUS.REQUESTING:
                return <CategorieRequesting />
            case defs.STATUS.SUCCESS:
                return <CategoriesSuccess categories={this.props.categories}/>
            case defs.STATUS.FAILED:
                return <CategoriesFailed />
            default:
                return ""
        }
    }
    render() {
        return (
            <div className="categories-body">
                <div className="categories-wrapper container d-flex flex-column">
                    <nav className="navbar navbar-expand navbar-light align-items-baseline">
                        <div className="navbar-brand mr-auto" style={{fontSize: "2.5em", fontWeight: "100"}}>
                            <span style={{fontWeight: "600"}}>N</span>otes
                        </div>
                        <div className="navbar-text" style={{fontSize: "1.5em"}}>
                            <span>All Categories</span>
                        </div>
                    </nav>
                    {this.getBody()}
                </div>
            </div>
        )
    }
}