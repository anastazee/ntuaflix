import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Box, Select, MenuItem, FormControl} from "@mui/material";
import TitleResultsList from "../components/titleresultslist";
import AlternativeSearchBar from "../components/genresearchbar";

const ResultsPage = () => {

  const router = useRouter();
  const [searchResults, setSearchResults] = useState(null);
  const [selectedSort, setSelectedSort] = useState("None");
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };
  
  const handleNARating = (rating) => {
    return rating === "N/A" ? 0 : parseFloat(rating);
  };

  const sortByRating = (a, b) => {
    const ratingA = handleNARating(a.rating.avRating);
    const ratingB = handleNARating(b.rating.avRating);

    return ratingB - ratingA;
  };

  const sortByStartYear = (a, b) => {
    if (a.startYear === null && b.startYear === null) {
        return 0;
    } else if (a.startYear === null) {
        return 1;
    } else if (b.startYear === null) {
        return -1;
    }
    
    return parseInt(b.startYear) - parseInt(a.startYear);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:9876/bygenre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qgenre: router.query.selectedGenre,
          minrating: router.query.minRating,
          yrFrom: router.query.startYear,
          yrTo: router.query.endYear,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        setSearchResults([]);
      } else {
        const data = await response.json();
        setSearchResults(data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.selectedGenre, router.query.minRating, router.query.startYear, router.query.endYear]);

  if (searchResults !== null && searchResults.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, padding: '20px' }}>
        <AlternativeSearchBar
          defaultGenre={router.query.selectedGenre || ""}
          defaultMinRating={router.query.minRating || ""}
          defaultStartYear={router.query.startYear || ""}
          defaultEndYear={router.query.endYear || ""}
        />
      </Box>
      <Typography variant="body1">No results found.</Typography>
      </div>
      );
  }

  if (searchResults === null) {
    return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Typography variant="body1">Loading...</Typography>
    </div>
    );
  }

  if (!isLoading && searchResults !== null &&  searchResults.length !== 0 && selectedSort !== "None") {
    if (selectedSort === "Rating") searchResults.sort(sortByRating);
    if (selectedSort === "Year") searchResults.sort(sortByStartYear);

  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, padding: '20px' }}>
        <AlternativeSearchBar
          defaultGenre={router.query.selectedGenre || ""}
          defaultMinRating={router.query.minRating || ""}
          defaultStartYear={router.query.startYear || ""}
          defaultEndYear={router.query.endYear || ""}
        />
      </Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ marginRight: '100px' }}>Search Results</Typography>

        {( 
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
          <TitleResultsList searchResults={searchResults} />
      </div>
    </div>
  );
}    

export default ResultsPage;