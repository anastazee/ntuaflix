
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });


const doc = {
    info: {
        version: '1.0.0',            // by default: '1.0.0'
        title: 'Ntuaflix REST API',              // by default: 'REST API'
        description: ''         // by default: ''
    },
    servers: [
        {
            url: 'https://localhost:9876',              // by default: 'http://localhost:3000'
            description: ''       // by default: ''
        },
        // { ... }
    ],
    tags: [                   // by default: empty Array
        {
            name: 'admin',             // Tag name
            description: 'administrator endpoints'       // Tag description
        },
        {
            name: 'user',
            description: 'user endpoints'
        }
        // { ... }
    ],
    "components": {
        "@schemas": {
            titleObject: {
                type: 'object',
                title: "Title Object",
                properties: {
                    "titleID": {
                        type: "string",
                        description: "Unique identifier for the movie"
                    },
                    "type": {
                        "type": "string",
                        "description": "Type of the title, ex. movie, tvEpisode, short [...]"
                    },
                    "originalTitle": {
                        "type": "string",
                        "description": "Original Title"
                    },
                    "titlePoster": {
                        "type": "string",
                        "description": "URL of the title's poster"
                    },
                    "startYr": {
                        "type": "string",
                        "description": "Year of the first release"
                    },
                    "endYr": {
                        "type": "string",
                        "description": "Year of the last release"
                    },
                    "genres": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "title": "Genre",
                            "properties": {
                                "genreTitle": {
                                    "type": "string",
                                    "description": "Word describing the genre"
                                }
                            }
                        }
                    },
                    "titleAkas": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "title": "Title Aka",
                            "properties": {
                                "akaTitle": {
                                    "type": "string",
                                    "description": "Alternative title for the region"
                                },
                                "regionAbbrev": {
                                    "type": "string",
                                    "description": "Abbreviation of the region"
                                }
                            }
                        }
                    },
                    "principals": {
                        type: "array",
                        "items": {
                            "type": "object",
                            "title": "Principal",
                            "properties": {
                                "nameID": {
                                    "type": "string",
                                    "description": "Unique identifier for the principal"
                                },
                                "name": {
                                    "type": "string",
                                    "description": "The principal's primary name"
                                },
                                "category": {
                                    "type": "string",
                                    "description": "The principal's category of work for the title"
                                }
                            }
                        }
                    },
                    "rating": {
                        "type": "object",
                        "title": "Rating",
                        "properties": {
                            "avRating": {
                                "type": "string",
                                "description": "Average Audience Rating for the title"
                            },
                            "nVotes": {
                                "type": "string",
                                "description": "Number of ratings"
                            }
                        }
                    }
                },
                example: {
                    "titleID": "tt3783958",
                    "type": "movie",
                    "originalTitle": "La La Land",
                    "titlePoster": "https://example.com/lalaland-poster.jpg",
                    "startYr": "2016",
                    "endYr": "2016",
                    "genres": [
                        { "genreTitle": "Musical" },
                        { "genreTitle": "Drama" },
                        { "genreTitle": "Romance" }
                    ],
                    "titleAkas": [
                        { "akaTitle": "La La Land", "regionAbbrev": "US" }
                    ],
                    "principals": [
                        { "nameID": "123", "name": "Ryan Gosling", "category": "Actor" },
                        { "nameID": "456", "name": "Emma Stone", "category": "Actress" }
                    ],
                    "rating": {
                        "avRating": "8.0",
                        "nVotes": "5000"
                    }
                }

            },
            "nameObject": {
                "type": "object",
                "properties": {
                    "nameID": {
                        "type": "string",
                        "description": "Unique identifier for the contributor"
                    },
                    "name": {
                        "type": "string",
                        "description": "The contributor's primary name"
                    },
                    "namePoster": {
                        "type": "string",
                        "description": "URL to the contributor's poster image"
                    },
                    "birthYr": {
                        "type": "string",
                        "description": "The birth year of the contributor"
                    },
                    "deathYr": {
                        "type": "string",
                        "description": "The death year of the contributor"
                    },
                    "profession": {
                        "type": "string",
                        "description": "The person's primary profession"
                    },
                    "nameTitles": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "titleID": {
                                    "type": "string",
                                    "description": "Title id of the title"
                                },
                                "category": {
                                    "type": "string",
                                    "description": "Category of Contributor's work in the title"
                                }

                            }
                        },
                        "description": "Titles associated with the contributor"
                    }
                },
                example: {
                    "nameID": "789012",
                    "name": "Keanu Reeves",
                    "namePoster": "https://example.com/keanu-reeves-poster.jpg",
                    "birthYr": "1964",
                    "deathYr": null,
                    "profession": "Actor",
                    "nameTitles": [
                        {
                            "titleID": "tt0133093",
                            "category": "Film",
                            "titleName": "The Matrix"
                        },
                        {
                            "titleID": "tt0473444",
                            "category": "Film",
                            "titleName": "John Wick"
                        },
                    ]
                }

            },
        }
    }
    // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./routes/mainroutes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

