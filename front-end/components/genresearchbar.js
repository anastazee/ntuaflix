// AlternativeSearchBar.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Select, MenuItem, Button, InputLabel, FormControl } from "@mui/material";

const AlternativeSearchBar = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch genres from the server and set them in the state
    fetch(`https://localhost:9876/genres`)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleSearch = () => {
    // Perform the search with the provided parameters
    const searchParams = {
      qgenre: selectedGenre,
      minrating: minRating,
      yrFrom: startYear,
      yrTo: endYear,
    };
    router.push({
        pathname: '/findbygenre',
        query: { 
            qgenre: selectedGenre,
            minrating: minRating,
            yrFrom: startYear,
            yrTo: endYear,
        },
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <FormControl variant="outlined" size="small" sx={{ backgroundColor: 'white', marginRight: '8px', borderRadius: '4px', width: '200px' }}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
            labelId="genre-label"
            id="genre-select"
            variant="outlined"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
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
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default AlternativeSearchBar;
