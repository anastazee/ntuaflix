// pages/info/[nameID].js
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import styles from '../../styles/InfoName.module.css'; // Import the CSS module
import MovieRow from '../../components/movierow';
import PrincipalMoviesList from '../../components/principalmovieslist';
import { Typography, Divider, Box } from '@mui/material';  // Make sure to include Box in the import statement




const InfoName = () => {
  const router = useRouter();
  const { nameID } = router.query;
  const [nameObject, setNameObject] = useState(null);
  const [knownFor, setKnownFor] = useState(null);
  const [principalMovies, setPrincipalMovies] = useState(null);

  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
  };

  useEffect(() => {
    if (nameID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/name/${nameID}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setNameObject(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [nameID]);

  useEffect(() => {
    if (nameID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/knownfor/${nameID}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setKnownFor(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [nameID]);

  useEffect(() => {
    if (nameID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/principalmovies/${nameID}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setPrincipalMovies(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [nameID]);


  if (!nameObject || !knownFor || !principalMovies) {
    // Data is still being fetched, or there was an error
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.infoContainer}>
        {nameObject.namePoster && (
          <div className={styles.imageContainer}>
            <img
              src={nameObject.namePoster.replace("{width_variable}", "w200")}
              alt="Name Poster"
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.detailsContainer}>
          <h1>{nameObject.name}</h1>

          <p>Birth Year: {nameObject.birthYr || 'N/A'}</p>
          {nameObject.deathYr && <p>Death Year: {nameObject.deathYr}</p>}
          <p>
            Profession: {nameObject.profession
              ? nameObject.profession
                .split(',')
                .map((word) => word.replace(/_/g, ' '))
                .join(', ')
              : 'N/A'}
          </p>
        </div>
      </div>{knownFor.length > 0 && (
        <div>
          <h2>Known For</h2>
          {/* Replace the existing code with MovieRow */}
          <MovieRow movies={knownFor} hsleft={handleScrollLeft} hsright={handleScrollRight} containerRef={containerRef} />
        </div>
      )}


      <h2>All titles</h2>
      <Box sx={{ marginTop: '20px', padding: '20px' }}>
        <PrincipalMoviesList movies={principalMovies} />
      </Box>

    </div>
  );
};

export default InfoName;
