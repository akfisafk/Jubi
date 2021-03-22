import React from 'react';
import Movie from '../Movie';
import Carousel from "react-elastic-carousel";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 750, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 6 },
    { width: 1800, itemsToShow: 7 }
];

const Category = ({ movie, dispatch, category }) => {

    return (
        <div className="movies-container">
            <h2 className="category-title">{category}</h2>
                <Carousel breakPoints={breakPoints}>
                    {movie.categories.map(movie => {
                        return <Movie key={Math.random()} movie={movie} newDispatch={dispatch} />
                    })}
                </Carousel>
        </div>
    )
}

export default Category;