import React, { useState } from "react";
import { Typography, Box, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import Link from 'next/link';

const NameResultsList = ({ searchResults }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {searchResults.map((dataObj, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }} key={index}>
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src={dataObj.namePoster ? dataObj.namePoster.replace("{width_variable}", "w200") : ''}
                                sx={{
                                    width: '100px', // Set desired width
                                    height: '100px', // Set desired height
                                    borderRadius: '50%', // Make the Avatar circular
                                    marginRight: '1rem' // Add space between the image and the text
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link href="/info/name/[nameID]" as={`/info/name/${dataObj.nameID}`}>
                                    <Typography
                                        sx={{
                                            fontSize: '24px', // Set desired font size
                                            fontWeight: 'bold', // Make text bold
                                            cursor: 'pointer', // Show pointer cursor on hover
                                            color: 'black',
                                        }}
                                        component="span"
                                    >
                                        {dataObj.name}
                                    </Typography>
                                </Link>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'block', fontSize: '20px', fontWeight: 'normal' }} // Set desired font size and weight for the year
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {dataObj.profession.replace("_", " ").split(",").join(", ") }
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    {/* Add divider after each list item except the last one */}
                    {index < searchResults.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </List>

    );
}

export default NameResultsList;