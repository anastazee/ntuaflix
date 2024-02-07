// titleprincipalslist.js

import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography } from '@mui/material';
import styles from '../styles/TitlePrincipalsList.module.css';  // Import the CSS module

const TitlePrincipalList = ({ principals }) => {
    return (
        <List className={styles.principalsList}>
            {principals && principals.length > 0 ? (
                principals.map((person, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="center" className={styles.personItem} key={index}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={person.name}
                                    src={person.namePoster ? person.namePoster.replace("{width_variable}", "w200") : ''}
                                    className={styles.personAvatar}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link href="/info/name/[nameID]" as={`/info/name/${person.nameID}`}>
                                        <Typography className={styles.personName}>
                                            {person.name}
                                        </Typography>
                                    </Link>
                                }
                                secondary={
                                    <>
                                        {person.category && (
                                            <Typography className={styles.personProfession} variant="body2" color="text.secondary">
                                                Category: {person.category}
                                            </Typography>
                                        )}
                                    </>
                                }
                            />
                        </ListItem>
                        {index < principals.length - 1 && <Divider />}
                    </React.Fragment>
                ))
            ) : (
                <Typography className={styles.noPeopleText} variant="body2" color="textSecondary">
                    No People Found
                </Typography>
            )}
        </List>
    );
};

export default TitlePrincipalList;
