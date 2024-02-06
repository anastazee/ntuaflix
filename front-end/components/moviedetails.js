// MovieDetails.js
import Link from 'next/link';
import styles from '../styles/MovieDetails.module.css';


const MovieDetails = ({ titleID, type, originalTitle, titlePoster, startYear, endYear }) => {
  return (
    <div className={styles.container}>
      <Link href={`/info/title/${titleID}`} passHref style={{ textDecoration: 'none' }}>
        <div className={styles.linkContainer}>
          <div className={styles.posterContainer}>
            {titlePoster && (
              <img
                src={titlePoster.replace('{width_variable}', 'w200')}
                alt="Movie Poster"
                style={{ width: '100px', height: '150px' }}
              />
            )}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.title}>{originalTitle}</p>
            <div className={styles.info}>
              <p>{startYear}</p>
              {/*<p>Type: {type}</p>*/}
              {/* Add other extra information as needed */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieDetails;
