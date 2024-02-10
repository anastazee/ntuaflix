CREATE DATABASE IF NOT EXISTS softeng;
USE softeng;

CREATE TABLE `Contributor` (
    `nconst` char(255) NOT NULL,
    `primaryName` char(255),
    `BirthYear` varchar(4),
    `DeathYear` varchar(4),
    `primaryProfession` char(255),
    `img_url_asset` char(255)
);

CREATE TABLE `Title` (
    `tconst` char(255) NOT NULL,
    `titleType` char(255) ,
    `primaryTitle` char(255) ,
    `originalTitle` char(255) ,
    `isAdult` char(255),
    `startYear` varchar(4),
    `endYear` varchar(4),
    `runtimeMinutes` varchar(10),
    `img_url_asset` char(255)
);

CREATE TABLE `Director` (
    `Contributornconst` char(255) NOT NULL,
    `Titletconst` char(255) NOT NULL
);

CREATE TABLE `Writer` (
    `Contributornconst` char(255) NOT NULL,
    `Titletconst` char(255) NOT NULL
);

CREATE TABLE `KnownFor` (
    `Contributornconst` char(255) NOT NULL,
    `Titletconst` char(255) NOT NULL
);

CREATE TABLE `title_principals` (
    `Contributornconst` char(255) NOT NULL,
    `Titletconst` char(255) NOT NULL,
    `ordering` int(10) NOT NULL,
    `category` char(255) NOT NULL,
    `job` char(255),
    `characters` char(255),
    `img_url_asset` char(255) 
);

CREATE TABLE `Episode` (
    `tconst` char(255) NOT NULL,
    `parentTconst` char(255) NOT NULL,
    `seasonNumber` int(10),
    `episodeNumber` int(10)
);

CREATE TABLE `genre` (
    `genreID` int(10) NOT NULL AUTO_INCREMENT,
    `genre` char(255) NOT NULL,
    PRIMARY KEY (`genreID`)
);


CREATE TABLE `Ratings` (
    `Titletconst` char(255) NOT NULL,
    `averageRating` decimal(2,1) NOT NULL,
    `numVotes` int(10) NOT NULL
);

CREATE TABLE `Akas` (
    `titleId` char(255) NOT NULL,
    `ordering` int(10) NOT NULL,
    `title` char(255) NOT NULL,
    `region` char(255),
    `language` char(255),
    `types` char(255),
    `attributes` char(255),
    `isOriginalTitle` int(10) NOT NULL
);

CREATE TABLE `movie_genre` (
    `Titletconst` char(255) NOT NULL,
    `genreID` int(10) NOT NULL
);

ALTER TABLE `Contributor`
    ADD PRIMARY KEY (`nconst`);

ALTER TABLE `Title`
    ADD PRIMARY KEY (`tconst`);

ALTER TABLE `Director`
    ADD PRIMARY KEY (`Contributornconst`, `Titletconst`);

ALTER TABLE `Writer`
    ADD PRIMARY KEY (`Contributornconst`, `Titletconst`);

ALTER TABLE `KnownFor`
    ADD PRIMARY KEY (`Contributornconst`, `Titletconst`);

ALTER TABLE `title_principals`
    ADD PRIMARY KEY (`Contributornconst`, `Titletconst`);

ALTER TABLE `Episode`
    ADD PRIMARY KEY (`tconst`, `parentTconst`);

ALTER TABLE `Ratings`
    ADD PRIMARY KEY (`Titletconst`);

ALTER TABLE `Akas`
    ADD PRIMARY KEY (`titleId`, `ordering`);

ALTER TABLE `movie_genre` 
    ADD PRIMARY KEY (`Titletconst`, `genreID`);

ALTER TABLE `Director`
    ADD CONSTRAINT `fk_director_contributor` 
    FOREIGN KEY (`Contributornconst`) 
    REFERENCES `Contributor` (`nconst`),
    ADD CONSTRAINT `fk_director_title` 
    FOREIGN KEY (`Titletconst`) 
    REFERENCES `Title` (`tconst`);

ALTER TABLE `Writer`
    ADD CONSTRAINT `fk_writer_contributor` 
    FOREIGN KEY (`Contributornconst`) 
    REFERENCES `Contributor` (`nconst`),
    ADD CONSTRAINT `fk_writer_title` 
    FOREIGN KEY (`Titletconst`) 
    REFERENCES `Title` (`tconst`);

ALTER TABLE `KnownFor`
    ADD CONSTRAINT `fk_knownfor_contributor` 
    FOREIGN KEY (`Contributornconst`) 
    REFERENCES `Contributor` (`nconst`),
    ADD CONSTRAINT `fk_knownfor_title` 
    FOREIGN KEY (`Titletconst`) 
    REFERENCES `Title` (`tconst`);

ALTER TABLE `title_principals`
    ADD CONSTRAINT `fk_principals_contributor` 
    FOREIGN KEY (`Contributornconst`) 
    REFERENCES `Contributor` (`nconst`),
    ADD CONSTRAINT `fk_principals_title` 
    FOREIGN KEY (`Titletconst`) 
    REFERENCES `Title` (`tconst`);

ALTER TABLE `Episode`
    ADD CONSTRAINT `fk_episode` 
    FOREIGN KEY (`tconst`) 
    REFERENCES `Title` (`tconst`);
    --ADD CONSTRAINT `fk_parent` 
    --FOREIGN KEY (`parentTconst`) 
    --REFERENCES `Title` (`tconst`);

ALTER TABLE `Akas`
    ADD CONSTRAINT `fk_title_aka` 
    FOREIGN KEY (`titleId`) 
    REFERENCES `Title` (`tconst`);

ALTER TABLE `movie_genre`
    ADD CONSTRAINT `fk_genre` 
    FOREIGN KEY (`genreID`) 
    REFERENCES `genre` (`genreID`),
    ADD CONSTRAINT `fk_title` 
    FOREIGN KEY (`Titletconst`) 
    REFERENCES `Title` (`tconst`);
