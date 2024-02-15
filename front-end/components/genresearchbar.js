// AlternativeSearchBar.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Select, MenuItem, Button, InputLabel, FormControl, Typography } from "@mui/material";

const AlternativeSearchBar = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [genreError, setGenreError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch genres from the server and set them in the state
    fetch(`https://localhost:9876/genres`)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error('Error fetching genres:', error));
    
      setSelectedGenre(router.query.selectedGenre || "");
      setMinRating(router.query.minRating || "");
      setStartYear(router.query.startYear || "");
      setEndYear(router.query.endYear || "");
    }, [router.query.selectedGenre, router.query.minRating, router.query.startYear, router.query.endYear]);

  const handleSearch = () => {
    // Perform the search with the provided parameters
    if (!selectedGenre) {
      setGenreError(true);
      return;
  }
    router.push({
        pathname: '/findbygenre',
        query: {
          selectedGenre,
          minRating,
          startYear,
          endYear,
        },
      });
    
    setSelectedGenre("");
    setMinRating("");
    setStartYear("");
    setEndYear("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <FormControl variant="outlined" size="small" sx={{ backgroundColor: 'white', marginRight: '8px', borderRadius: '4px', width: '200px' }}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
            labelId="genre-label"
            id="genre-select"
            variant="outlined"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setGenreError(false);
            }}
            size="small"
            sx={{ backgroundColor: 'white', marginRight: '8px', width: '200px', color: 'black' }}
        >
            {genres && genres.length > 0 && genres.map((genre) => (
            <MenuItem key={genre.genreID} value={genre.genre}>
                {genre.genre}
            </MenuItem>
            ))}
        </Select>
    </FormControl>
    
      <TextField
        id="minRating"
        label="Min Rating"
        variant="outlined"
        size="small"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        sx={{ backgroundColor: 'white', marginRight: '8px', borderRadius: '4px', width: '200px' }}
      />
      <TextField
        id="startYear"
        label="Start Year"
        variant="outlined"
        size="small"
        value={startYear}
        onChange={(e) => setStartYear(e.target.value)}
        sx={{ backgroundColor: 'white', marginRight: '8px', borderRadius: '4px', width: '200px' }}
      />
      <TextField
        id="endYear"
        label="End Year"
        variant="outlined"
        size="small"
        value={endYear}
        onChange={(e) => setEndYear(e.target.value)}
        sx={{ backgroundColor: 'white', marginRight: '8px', borderRadius: '4px', width: '200px' }}
      />
      <Button variant="contained" onClick={() => handleSearch()} style={{ backgroundColor: '#1e849c', color: 'white' }}>
        Search
      </Button>
    </Box>
    {genreError && <Typography color="error" sx={{ alignSelf: 'flex-start', marginTop: '8px' }}>Please select a genre.</Typography>}
</Box>
  );
};

export default AlternativeSearchBar;
