import React, { useState } from "react";
import { Typography, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import Link from 'next/link';
import styles from '../styles/TitleResultsList.module.css';


const TitleResultsList = ({ searchResults }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
            {searchResults.map((dataObj, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }} key={index}>
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src={dataObj.titlePoster ? dataObj.titlePoster.replace("{width_variable}", "w200") : ''}
                                sx={{
                                    width: '100px', // Set desired width
                                    height: '148px', // Set desired height
                                    borderRadius: '1px', // Set desired border radius for a rounded rectangle
                                    marginRight: '1rem' // Add space between the image and the text
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link href="/info/title/[titleID]" as={`/info/title/${dataObj.titleID}`} style={{ textDecoration: 'none' }}>
                                    <Typography
                                        className={styles.title}
                                        sx={{
                                            fontSize: '24px', // Set desired font size
                                            fontWeight: 'bold', // Make text bold
                                            color: 'black',
                                        }}
                                    >
                                        {dataObj.originalTitle}
                                    </Typography>
                                </Link>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        className={styles.secondary}
                                        sx={{ display: 'block', fontSize: '20px', fontWeight: 'normal' }} // Set desired font size and weight for the year
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {dataObj.startYear}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <Typography
                            className={styles.rating}
                            sx={{ display: 'inline', fontSize: '20px', marginLeft: '1rem' }} // Adjust margin to move rating to the far left
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Rating {dataObj.rating.avRating}
                        </Typography>

                    </ListItem>
                    {/* Add divider after each list item except the last one */}
                    {index < searchResults.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </List>

    );
};

export default TitleResultsList;
