import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography } from '@mui/material';
import styles from '../styles/PrincipalMoviesList.module.css';  // Import the CSS module

const PrincipalMoviesList = ({ movies }) => {
    return (
        <List className={styles.moviesList}>
            {movies && movies.length > 0 ? (
                movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" className={styles.movieItem} key={index}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={movie.originalTitle}
                                    src={movie.titlePoster ? movie.titlePoster.replace("{width_variable}", "w200") : ''}
                                    className={styles.movieAvatar}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link href="/info/title/[titleID]" as={`/info/title/${movie.titleID}`}>
                                        <Typography className={styles.movieTitle}>
                                            {movie.originalTitle}
                                        </Typography>
                                    </Link>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography className={styles.movieYear} component="span" variant="body2" color="text.primary">
                                            {movie.startYear}
                                        </Typography>
                                        {movie.category && (
                                            <Typography variant="body2" color="text.secondary">
                                                Category: {movie.category}
                                            </Typography>
                                        )}
                                        {movie.category && ['actor', 'actress'].includes(movie.category.toLowerCase()) && movie.characters && (
                                            <Typography variant="body2" color="text.secondary">
                                                Characters: {movie.characters || 'N/A'}
                                            </Typography>
                                        )}
                                    </React.Fragment>
                                }

                            />
                        </ListItem>
                        {index < movies.length - 1 && <Divider />}
                    </React.Fragment>
                ))
            ) : (
                <Typography className={styles.noMoviesText} variant="body2" color="textSecondary">
                    No Movies Found
                </Typography>
            )}
        </List>
    );
};

export default PrincipalMoviesList;
