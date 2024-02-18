import styles from '../styles/home.module.css';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import MovieRow from '../components/movierow';
import { Typography, Divider, Box } from '@mui/material';  // Make sure to include Box in the import statement
import AlternativeSearchBar from '../components/genresearchbar';


function HomePage() {
  const [top10movies, settop10moviesObject] = useState(null);
  const [votes10movies, setvotes10moviesObject] = useState(null);
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  const handleScrollLeft = (containerRef) => {
    containerRef.current.scrollLeft -= 320; // Adjust the scroll distance as needed
  };

  const handleScrollRight = (containerRef) => {
    containerRef.current.scrollLeft += 320; // Adjust the scroll distance as needed
  };

  useEffect(() => {

    // Fetch data from the API endpoint
    fetch(`https://localhost:9876/ntuaflix_api/top10movies`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => {
        // Set the fetched data to the state
        settop10moviesObject(d.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {

    // Fetch data from the API endpoint
    fetch(`https://localhost:9876/ntuaflix_api/votes10movies`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => {
        // Set the fetched data to the state
        setvotes10moviesObject(d.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, marginTop: '20px' }}>
        <AlternativeSearchBar/>
      </Box>
      <h1>Welcome to Ntuaflix</h1>
      <p>be the nerd you aspire to be</p>

      <div className={styles.textcontainer}>
        <h2>Top Rated Movies</h2>
        {top10movies && (
          <MovieRow movies={top10movies} hsleft={() => handleScrollLeft(containerRef1)} hsright={() => handleScrollRight(containerRef1)} containerRef={containerRef1} />
        )}
        <h2>Audience favorites</h2>
        {votes10movies && (
          <MovieRow movies={votes10movies} hsleft={() => handleScrollLeft(containerRef2)} hsright={() => handleScrollRight(containerRef2)} containerRef={containerRef2} />
        )}
      </div>
    </div>
  );
}

export default HomePage;