import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, IconButton, Box, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { Link as MuiLink } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Titles");
  const router = useRouter();

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    if (selectedOption === 'People')
    router.push({
      pathname: '/find',
      query: { 
        so: "nm",
        q: searchQuery // Adding selectedOption to the query object
      },
    });
    if (selectedOption === 'Titles') 
    router.push({
      pathname: '/find',
      query: { 
        so: "tt",
        q: searchQuery, // Adding selectedOption to the query object
      },
    });
    };
    

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#1e849c' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width:"100%" }}>
      <MuiLink href="/" underline="none" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ marginLeft: '8px', color: 'white', textDecoration: 'none' }}>Ntuaflix</Typography>
        </MuiLink>
        <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <Select
            defaultValue={selectedOption}
            onChange={handleOptionChange}
            //displayEmpty
            size="small"
            sx={{ backgroundColor: 'white', marginRight: '2px', color: 'black' }}
          >
            <MenuItem value="Titles">Titles</MenuItem>
            <MenuItem value="People">People</MenuItem>
            </Select>
          <TextField
            id="search"
            placeholder="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            sx={{ backgroundColor: 'white', borderRadius: '4px', width: '50%'}}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton sx={{ color: "black" }} onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
              </InputAdornment>,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;