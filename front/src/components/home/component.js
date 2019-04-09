import React from 'react'

import { Link } from 'react-router-dom'

import './style.css'

const CategoryCard = ({name, imageUrl}) => (
    <div className="category-card">
        <img className="category-card-image" src={imageUrl} alt={`Illustration for ${name} category`} />
        <div className="category-card-caption">{name}</div>
    </div>
)

export const Home = ({ categories }) => (
    <div className="home-wrapper">
        <div className="categories">
            {categories.map(category => (
                <Link key={category.id} to={`/categories/${category.id}`}>
                    <CategoryCard {...category} />
                </Link>
            ))}
        </div>

    </div>
)