import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Box, Select, MenuItem, FormControl} from "@mui/material";
import TitleResultsList from "../components/titleresultslist";
import NameResultsList from "../components/nameresultslist";

const ResultsPage = () => {

  const router = useRouter();
  const [searchResults, setSearchResults] = useState(null);
  const [selectedSort, setSelectedSort] = useState("None");
  const [isLoading, setIsLoading] = useState(true);
  var searchQuery = router.query["q"];
  var option = router.query["so"];

  console.log("the query is", searchQuery);
  console.log("the option is", option);
  console.log(isLoading);
  
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };
  
  const handleNARating = (rating) => {
    return rating === "N/A" ? 0 : parseFloat(rating);
  };

  const sortByRating = (a, b) => {
    // Convert average ratings to numbers for proper comparison
    const ratingA = handleNARating(a.rating.avRating);
    const ratingB = handleNARating(b.rating.avRating);

    // Sort in descending order
    return ratingB - ratingA;
  };

  const sortByStartYear = (a, b) => {
    // Handle the case where startYear is null
    if (a.startYear === null && b.startYear === null) {
        return 0;
    } else if (a.startYear === null) {
        return 1; // Place items with null startYear at the end
    } else if (b.startYear === null) {
        return -1; // Place items with null startYear at the end
    }
    
    return parseInt(b.startYear) - parseInt(a.startYear);
  };

  useEffect(() => {
    setIsLoading(true);
    setSearchResults(null);
    
    let flag = false;

    fetch(
       option === "tt"
         ? "http://localhost:9876/searchtitle"
         : "http://localhost:9876/searchname",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: 
           option === "tt" 
         ? JSON.stringify({
           titlePart: router.query["q"],
         })
         : JSON.stringify({
           namePart: router.query["q"],
         })
       }
     )
       .then((response) => {
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         if (response.status === 204) {
           flag = true;
           return [];
         } else {
           return response.json();
         }
       })
       .then((d) => {
         if (flag) setSearchResults([]);
         else setSearchResults(d.data);
         setIsLoading(false);
         
       })
       .catch((error) => {
         console.error("Error:", error);
         setIsLoading(false);
        });

  }, [router.query["q"], router.query["so"]]);


  if (searchResults !== null && searchResults.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ marginTop: '15px', marginBottom: '15px' }}>Search '{searchQuery}'</Typography>
      <Typography variant="body1">No results found.</Typography>
      </div>
      );
  }


  if (searchResults === null || (searchResults[0].hasOwnProperty('rating') && option === 'nm') || (searchResults[0].hasOwnProperty('profession') && option === 'tt')) {
    return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h4" sx={{ marginTop: '15px', marginBottom: '15px' }}>Search '{searchQuery}'</Typography>
    <Typography variant="body1">Loading...</Typography>
    </div>
    );
  }



  if (!isLoading && searchResults !== null &&  searchResults.length !== 0 && selectedSort !== "None") {
    if (selectedSort === "Rating") searchResults.sort(sortByRating);
    if (selectedSort === "Year") searchResults.sort(sortByStartYear);

  }

    console.log("the result is \n", searchResults);
    //console.log("the length is ", searchResults.length);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ marginTop: '15px', marginBottom: '15px' }}>Search '{searchQuery}'</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ marginRight: '100px' }}>Search Results</Typography>

          {option === "tt" && ( 
            <>
              <Typography variant="h7" sx={{ marginLeft: '550px' }}>Sort By </Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  defaultValue={selectedSort}
                  onChange={handleSortChange}
                  displayEmpty
                  size="small"
                  sx={{ backgroundColor: 'white', color: 'black', marginLeft: '1rem' }}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Rating">Rating</MenuItem>
                  <MenuItem value="Year">Year</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
            </Box>
        </div>
        <div>
            {option === "nm" ? <NameResultsList searchResults={searchResults} /> : <TitleResultsList searchResults={searchResults} /> }
        </div>
      </div>
    );
}    

export default ResultsPage;