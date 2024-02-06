// pages/info/[titleID].js
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import styles from '../../../styles/InfoTitle.module.css'; // Import the CSS module
import TitlePrincipalsList from '../../../components/titleprincipalslist';
import { Typography, Divider, Box, IconButton, Collapse } from '@mui/material'; // Make sure to include Box, IconButton, and Collapse in the import statement

const InfoTitle = () => {
  const router = useRouter();
  const { titleID } = router.query;
  const [titleObject, setTitleObject] = useState(null);
  const [openAkaList, setOpenAkaList] = useState(false);
  const [allprincipals, setallprincipals] = useState(null);
  const [director, setdirector] = useState(null);
  const [writers, setwriters] = useState(null);

  useEffect(() => {
    if (titleID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/title/${titleID}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setTitleObject(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [titleID]);

  useEffect(() => {
    if (titleID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/titleprincipals/${titleID}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setallprincipals(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [titleID]);

  useEffect(() => {
    if (titleID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/director/${titleID}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setdirector(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [titleID]);

  useEffect(() => {
    if (titleID) {
      // Fetch data from the API endpoint
      fetch(`http://localhost:9876/writers/${titleID}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((d) => {
          // Set the fetched data to the state
          setwriters(d.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [titleID]);

  if (!titleObject || !allprincipals || !director || !writers) {
    // Data is still being fetched, or there was an error
    return <div>Loading...</div>;
  }

  const handleAkaListToggle = () => {
    setOpenAkaList(!openAkaList);
  };

  return (
    <div>
      <div className={styles.infoContainer}>
        {titleObject.titlePoster && (
          <div className={styles.imageContainer}>
            <img
              src={titleObject.titlePoster.replace('{width_variable}', 'w200')}
              alt="Title Poster"
              className={styles.image}
            />
            <Typography variant="h6" className={styles.rating}>
              Rating: {titleObject.rating.avRating} ({titleObject.rating.nVotes} votes)
            </Typography>
          </div>
        )}

        <div className={styles.detailsContainer}>
          <h1>{titleObject.originalTitle}</h1>

          <p>Type: {titleObject.type}</p>
          <p>
            Year: {titleObject.startYear} - {titleObject.endYear || 'Present'}
          </p>
          <p>Genres: {titleObject.genres.map((genre) => genre.genreTitle).join(', ')}</p>

          <div>
            <Typography onClick={handleAkaListToggle} className={styles.akaTitle}>
              AKA Titles {openAkaList ? '▲' : '▼'}
            </Typography>
            <Collapse in={openAkaList}>
              <ul>
                {titleObject.titleAkas.map((aka) => (
                  <li key={aka.regionAbbrev}>{`${aka.regionAbbrev}: ${aka.akaTitle}`}</li>
                ))}
              </ul>
            </Collapse>
          </div>
        </div>
      </div>

      <Divider />

      <div className={styles.columnsContainer}>
        <div className={styles.leftColumn}>
          <Typography variant="h6" className={styles.columnTitle}>
            All Principals
          </Typography>
          <TitlePrincipalsList principals={allprincipals} />
        </div>

        <div className={styles.rightColumn}>
          <div>
            <Typography variant="h6" className={styles.columnTitle}>
              Directors
            </Typography>
            <TitlePrincipalsList principals={director} />
          </div>

          <div>
            <Typography variant="h6" className={styles.columnTitle}>
              Writers
            </Typography>
            <TitlePrincipalsList principals={writers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTitle;
