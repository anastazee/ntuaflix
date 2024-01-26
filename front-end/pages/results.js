import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography, IconButton, Box, TextField, InputAdornment, List, ListItem, ListItemText} from "@mui/material";

const ResultsPage = () => {
  
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  var searchQuery = router.query["q"];
  var option = router.query["so"];
  console.log(searchQuery);
  if (option == "nm"){
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
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }
  if (option == "tt"){
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
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }
 
  return (
    <div>
      <h2>Search '{searchQuery}' </h2>
       <Box sx={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Search Results</Typography> 
        <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        {/* <List>
           {searchResults.map((result, index) => ( 
            <ListItem key={index}>
              <ListItemText primary={searchResults.data.originalTitle} secondary={`Type: ${searchResults.data.type}`} />
            </ListItem>
           ))}
        </List> */}
      </Box> 
    </div>
  );
};

export default ResultsPage;