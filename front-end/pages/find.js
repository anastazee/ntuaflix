import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Box } from "@mui/material";
import Link from 'next/link';
import TitleResultsList from "../components/titleresultslist";
import NameResultsList from "../components/nameresultslist";

const ResultsPage = () => {

  const router = useRouter();
  const [searchResults, setSearchResults] = useState(null);
  var searchQuery = router.query["q"];
  var option = router.query["so"];
  var flag = false;

  console.log("the query is", searchQuery);
  //useEffect(() => {
    //let ignore = false;
  if (option === "nm") {
    //useEffect(() => {
    
    fetch("http://localhost:9876/searchname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namePart: searchQuery
      }),
    })
    .then((response) => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      console.log(response.status);
      // Check if response is empty
      if (response.status === 204) { // 204 No Content status code indicates empty response
          // Handle empty response here, for example:
          console.log("got empty");
          flag = true;
      } else {
          return response.json(); // Parse JSON if response is not empty
      }
  })
      .then((d) => {
        if (flag) setSearchResults([]);
        else  setSearchResults(d);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log (" i am fetching")
  }
  if (option === "tt") {
    //useEffect(() => {
    fetch("http://localhost:9876/searchtitle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titlePart: searchQuery
      }),
    })
    .then((response) => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      console.log(response.status);
      // Check if response is empty
      if (response.status === 204) { // 204 No Content status code indicates empty response
          // Handle empty response here, for example:
          console.log("got empty");
          flag = true;
      } else {
          return response.json(); // Parse JSON if response is not empty
      }
  })
      .then((d) => {
        if (flag) setSearchResults([]);
        else  setSearchResults(d);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
     // return () => {
      //  ignore = true;
      //}
    }
   // }, [searchQuery, option]);


    console.log("the result is \n", searchResults);
    //console.log("the length is ", searchResults.length);
    return (
      <div>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>Search '{searchQuery}'</Typography>
        {searchResults !== null ? (
        <Box sx={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>Search Results</Typography>
          {searchResults.length === 0 ? (
            <Typography variant="body1">No results found.</Typography>
          ) : (
            option === "nm" ? <NameResultsList searchResults={searchResults} /> : <TitleResultsList searchResults={searchResults} />
          )}
        </Box> )
        : (<Typography variant="body1">Loading...</Typography>) }
      </div>
    );    
};

export default ResultsPage;