import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography, Box, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import Link from 'next/link';

const ResultsPage = () => {

  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  var searchQuery = router.query["q"];
  var option = router.query["so"];

  console.log(searchQuery);
  if (option == "nm") {
    fetch("http://localhost:9876/searchname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namePart: searchQuery
      }),
    })
      .then((response) => response.json())
      .then((d) => {
        setSearchResults(d.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return (
      <div>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>Search '{searchQuery}'</Typography>
        <Box sx={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>Search Results</Typography>
          { /* <pre>{JSON.stringify(searchResults, null, 2)}</pre> */}

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
                      <Link href="/info/[nameID]" as={`/info/${dataObj.nameID}`}>
                        <Typography
                          sx={{
                            fontSize: '24px', // Set desired font size
                            fontWeight: 'bold', // Make text bold
                            cursor: 'pointer', // Show pointer cursor on hover
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
                          {dataObj.profession}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  {/* <Typography
                    sx={{ display: 'inline', fontSize: '20px', marginLeft: '1rem' }} // Adjust margin to move rating to the far left
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Rating {dataObj.rating.avRating}
                  </Typography> */}

                </ListItem>
                {/* Add divider after each list item except the last one */}
                {index < searchResults.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>


        </Box>
      </div>
    );
  }
  if (option == "tt") {
    fetch("http://localhost:9876/searchtitle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titlePart: searchQuery
      }),
    })
      .then((response) => response.json())
      .then((d) => {
        setSearchResults(d.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });


    return (
      <div>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>Search '{searchQuery}'</Typography>
        <Box sx={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>Search Results</Typography>
          { /* <pre>{JSON.stringify(searchResults, null, 2)}</pre> */}

          <List sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
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
                      <Link href="/info/[nameID]" as={`/info/${dataObj.titleID}`}>
                        <Typography
                          sx={{
                            fontSize: '24px', // Set desired font size
                            fontWeight: 'bold', // Make text bold
                          }}
                        >
                          {dataObj.originalTitle}
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
                          {dataObj.startYear}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Typography
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


        </Box>
      </div>
    );

  }

};

export default ResultsPage;