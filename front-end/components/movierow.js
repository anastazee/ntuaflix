// MovieRow.js
import React, { useRef } from 'react';
import MovieDetails from './moviedetails';
import styles from '../styles/MovieDetails.module.css';



const MovieRow = ({ movies, hsleft, hsright, containerRef }) => {
    return (
        <div className={styles.scrollContainer}>
            <div className={styles.arrowContainer} onClick={hsleft}>
                <div className={styles.scrollArrowLeft}>
                    &lt;
                </div>
            </div>
            <div className={styles.moviesContainer} ref={containerRef}>
                {movies.map((movie) => (
                    <MovieDetails
                        key={movie.titleID}
                        titleID={movie.titleID}
                        type={movie.type}
                        originalTitle={movie.originalTitle}
                        titlePoster={movie.titlePoster}
                        startYear={movie.startYear}
                        endYear={movie.endYear}
                    />
                ))}
            </div>
            <div className={styles.arrowContainer} onClick={hsright}>
                <div className={styles.scrollArrowRight}>
                    &gt;
                </div>
            </div>
        </div>
    );
};

export default MovieRow;
