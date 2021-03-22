import React from 'react';
import FeaturedMovie from '../FeaturedMovie';
import Carousel from "react-elastic-carousel";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 700, itemsToShow: 2 },
    { width: 1150, itemsToShow: 3 },
    { width: 1450, itemsToShow: 4 },
    { width: 1750, itemsToShow: 5 }
];

const Popular = ({ movie, dispatch }) => {

    return (
        <div className="movies-container">
            <h2 className="category-title">Trending</h2>
            <Carousel breakPoints={breakPoints}>
            {movie.categories.map(movie => {
                return (
                    <FeaturedMovie key={Math.random()} movie={movie} newDispatch={dispatch} />
                )
            })}
            </Carousel>
        </div>
    )
}

export default Popular;
