const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const mockMovies = [
  {
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: new Date("1994-09-23"),
    runtime: 142,
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    vote_average: 9.3,
    vote_count: 2343110,
    popularity: 6.741,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    adult: false,
    video: false,
    production_companies: [
      { id: 97, name: "Castle Rock Entertainment", logo_path: "/7znWcbudgIUSUg0K7gkL7BW3HYV.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    homepage: "",
    imdb_id: "tt0111161",
    revenue: 28341469,
    budget: 25000000,
    trailer_url: "https://www.youtube.com/embed/6hB3S9bIaco",
    cast: [
      { id: 504, name: "Tim Robbins", character: "Andy Dufresne", profile_path: "/rKVgQJ8p0Jxw4yG0h9logjUh9a.jpg", order: 0 },
      { id: 505, name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", profile_path: "/9059aSe2B9EoC1VOtvcQYllR6.jpg", order: 1 }
    ],
    crew: [
      { id: 400, name: "Frank Darabont", job: "Director", department: "Directing", profile_path: "/npOnzMZVE7Qml4MSN3H1Q5iZhE.jpg" },
      { id: 400, name: "Frank Darabont", job: "Screenplay", department: "Writing", profile_path: "/npOnzMZVE7Qml4MSN3H1Q5iZhE.jpg" }
    ],
    keywords: [
      { id: 378, name: "prison" },
      { id: 417, name: "corruption" },
      { id: 818, name: "based on novel or book" }
    ]
  },
  {
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: new Date("1972-03-14"),
    runtime: 175,
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    vote_average: 9.2,
    vote_count: 1620367,
    popularity: 90.585,
    original_language: "en",
    original_title: "The Godfather",
    adult: false,
    video: false,
    production_companies: [
      { id: 4, name: "Paramount", logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }, { iso_639_1: "it", name: "Italiano" }],
    status: "Released",
    tagline: "An offer you can't refuse.",
    homepage: "",
    imdb_id: "tt0068646",
    revenue: 134966411,
    budget: 6000000,
    trailer_url: "https://www.youtube.com/embed/sY1S34973zA",
    cast: [
      { id: 3084, name: "Marlon Brando", character: "Don Vito Corleone", profile_path: "/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg", order: 0 },
      { id: 3085, name: "Al Pacino", character: "Michael Corleone", profile_path: "/2dGBMpD7rjRaMPt8Bs7QC6rZi4V.jpg", order: 1 }
    ],
    crew: [
      { id: 1776, name: "Francis Ford Coppola", job: "Director", department: "Directing", profile_path: "/3PbbiX7g6H1vg9T3YVnBWkKFJsZ.jpg" },
      { id: 1776, name: "Francis Ford Coppola", job: "Screenplay", department: "Writing", profile_path: "/3PbbiX7g6H1vg9T3YVnBWkKFJsZ.jpg" }
    ],
    keywords: [
      { id: 131, name: "italy" },
      { id: 700, name: "italo-american" },
      { id: 818, name: "based on novel or book" }
    ]
  },
  {
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    release_date: new Date("2008-07-16"),
    runtime: 152,
    genres: [
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" }
    ],
    vote_average: 9.0,
    vote_count: 2303232,
    popularity: 37.518,
    original_language: "en",
    original_title: "The Dark Knight",
    adult: false,
    video: false,
    production_companies: [
      { id: 429, name: "DC Comics", logo_path: "/2Tc1P3Ac8hjBcTZqXKS1R0cDk5Z.png", origin_country: "US" },
      { id: 128064, name: "Legendary Pictures", logo_path: "/5VXS5KfF2nyPIeGqfKAhEDHqzmS.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }, { iso_3166_1: "GB", name: "United Kingdom" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }, { iso_639_1: "zh", name: "普通话" }],
    status: "Released",
    tagline: "Welcome to a world without rules.",
    homepage: "",
    imdb_id: "tt0468569",
    revenue: 1004558444,
    budget: 185000000,
    trailer_url: "https://www.youtube.com/embed/EXeTwQWrcwY",
    cast: [
      { id: 3894, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "/qCpZn2e3dimwbryLnqxZuI88PTi.jpg", order: 0 },
      { id: 1810, name: "Heath Ledger", character: "The Joker", profile_path: "/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg", order: 1 },
      { id: 1811, name: "Aaron Eckhart", character: "Harvey Dent / Two-Face", profile_path: "/fSb3ioC4rShXNKNzZU0JQydZkKl.jpg", order: 2 }
    ],
    crew: [
      { id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" },
      { id: 525, name: "Christopher Nolan", job: "Screenplay", department: "Writing", profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }
    ],
    keywords: [
      { id: 849, name: "dc comics" },
      { id: 9715, name: "superhero" },
      { id: 9717, name: "based on comic" }
    ]
  },
  {
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: new Date("2010-07-15"),
    runtime: 148,
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" }
    ],
    vote_average: 8.8,
    vote_count: 22186,
    popularity: 27.920,
    original_language: "en",
    original_title: "Inception",
    adult: false,
    video: false,
    production_companies: [
      { id: 923, name: "Legendary Pictures", logo_path: "/5VXS5KfF2nyPIeGqfKAhEDHqzmS.png", origin_country: "US" },
      { id: 10104, name: "Syncopy", logo_path: "/mSn3wZWYYtI8D2bO3ctx41kbTBn.png", origin_country: "GB" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }, { iso_3166_1: "GB", name: "United Kingdom" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }, { iso_639_1: "ja", name: "日本語" }, { iso_639_1: "fr", name: "Français" }],
    status: "Released",
    tagline: "Your mind is the scene of the crime.",
    homepage: "",
    imdb_id: "tt1375666",
    revenue: 836836967,
    budget: 160000000,
    trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0",
    cast: [
      { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg", order: 0 },
      { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "/4U9G2JcZqjrEUBGGsR2gvHr5Hq.jpg", order: 1 },
      { id: 27578, name: "Elliot Page", character: "Ariadne", profile_path: "/eLcahZpIwwekg0H5pqGn3LrCjJf.jpg", order: 2 }
    ],
    crew: [
      { id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" },
      { id: 525, name: "Christopher Nolan", job: "Screenplay", department: "Writing", profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }
    ],
    keywords: [
      { id: 1566, name: "dream" },
      { id: 4459, name: "subconscious" },
      { id: 612, name: "hotel" }
    ]
  },
  {
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    release_date: new Date("2014-11-05"),
    runtime: 169,
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" }
    ],
    vote_average: 8.6,
    vote_count: 12827290,
    popularity: 30.517,
    original_language: "en",
    original_title: "Interstellar",
    adult: false,
    video: false,
    production_companies: [
      { id: 923, name: "Legendary Pictures", logo_path: "/5VXS5KfF2nyPIeGqfKAhEDHqzmS.png", origin_country: "US" },
      { id: 33, name: "Universal Pictures", logo_path: "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }, { iso_3166_1: "GB", name: "United Kingdom" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    homepage: "",
    imdb_id: "tt0816692",
    revenue: 677471339,
    budget: 165000000,
    trailer_url: "https://www.youtube.com/embed/zSWdZVtXT7E",
    cast: [
      { id: 6193, name: "Leonardo DiCaprio", character: "Dr. Amelia Brand", profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg", order: 0 },
      { id: 3894, name: "Christian Bale", character: "Dr. Mann", profile_path: "/qCpZn2e3dimwbryLnqxZuI88PTi.jpg", order: 1 },
      { id: 24045, name: "Joseph Gordon-Levitt", character: "Dr. Romilly", profile_path: "/4U9G2JcZqjrEUBGGsR2gvHr5Hq.jpg", order: 2 }
    ],
    crew: [
      { id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" },
      { id: 525, name: "Christopher Nolan", job: "Screenplay", department: "Writing", profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }
    ],
    keywords: [
      { id: 83, name: "saving the world" },
      { id: 4379, name: "artificial intelligence" },
      { id: 5268, name: "man vs machine" }
    ]
  },
  {
    title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    release_date: new Date("1994-09-10"),
    runtime: 154,
    genres: [
      { id: 53, name: "Thriller" },
      { id: 80, name: "Crime" }
    ],
    vote_average: 8.5,
    vote_count: 2204680,
    popularity: 25.249,
    original_language: "en",
    original_title: "Pulp Fiction",
    adult: false,
    video: false,
    production_companies: [
      { id: 14, name: "Miramax", logo_path: "/pH38r3O2vqcZ8UkXqn2wgWdfZjE.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    tagline: "Just because you are a character doesn't mean you have character.",
    homepage: "",
    imdb_id: "tt0110912",
    revenue: 214179088,
    budget: 8000000,
    trailer_url: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    cast: [
      { id: 13848, name: "John Travolta", character: "Vincent Vega", profile_path: "/9vlJC9H9NP03pjFGmRQ1rBbDjBm.jpg", order: 0 },
      { id: 13847, name: "Uma Thurman", character: "Mia Wallace", profile_path: "/6t61jKM9v8M1kdKY5m4yX7HKkw.jpg", order: 1 },
      { id: 13846, name: "Samuel L. Jackson", character: "Jules Winnfield", profile_path: "/AiAYAqyNqgfbMC1NC5g0HvO0qh8.jpg", order: 2 }
    ],
    crew: [
      { id: 13849, name: "Quentin Tarantino", job: "Director", department: "Directing", profile_path: "/1gjcpAa99FAOWGnrUvHEXXsRsVw.jpg" },
      { id: 13849, name: "Quentin Tarantino", job: "Screenplay", department: "Writing", profile_path: "/1gjcpAa99FAOWGnrUvHEXXsRsVw.jpg" }
    ],
    keywords: [
      { id: 293, name: "female nudity" },
      { id: 378, name: "prison" },
      { id: 612, name: "hotel" }
    ]
  },
  {
    title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: new Date("1999-03-30"),
    runtime: 136,
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" }
    ],
    vote_average: 8.7,
    vote_count: 1676429,
    popularity: 27.370,
    original_language: "en",
    original_title: "The Matrix",
    adult: false,
    video: false,
    production_companies: [
      { id: 79, name: "Village Roadshow Pictures", logo_path: "/tpFpsqbletgYkOpE1e6Ygo8jWA2.png", origin_country: "US" },
      { id: 372, name: "Groucho II Film Partnership", logo_path: null, origin_country: "" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    tagline: "Welcome to the Real World.",
    homepage: "",
    imdb_id: "tt0133093",
    revenue: 467222824,
    budget: 63000000,
    trailer_url: "https://www.youtube.com/embed/vKQi3bBA1y8",
    cast: [
      { id: 6384, name: "Keanu Reeves", character: "Neo", profile_path: "/4D0PpNI0kmP58hgrwGC3wCjxhbn.jpg", order: 0 },
      { id: 6385, name: "Laurence Fishburne", character: "Morpheus", profile_path: "/8suOhUmPbfKqDQ17ZZ8KwgNPQ.jpg", order: 1 },
      { id: 6386, name: "Carrie-Anne Moss", character: "Trinity", profile_path: "/9sgEDW3bM8qTCvZmjTQfDqOpYg.jpg", order: 2 }
    ],
    crew: [
      { id: 6387, name: "Lilly Wachowski", job: "Director", department: "Directing", profile_path: "/pdtjFwlZmWAb7VlqFZe0y6srpX.jpg" },
      { id: 6388, name: "Lana Wachowski", job: "Director", department: "Directing", profile_path: "/pdtjFwlZmWAb7VlqFZe0y6srpX.jpg" }
    ],
    keywords: [
      { id: 83, name: "saving the world" },
      { id: 4379, name: "artificial intelligence" },
      { id: 5268, name: "man vs machine" }
    ]
  },
  {
    title: "Forrest Gump",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    release_date: new Date("1994-06-23"),
    runtime: 142,
    genres: [
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" }
    ],
    vote_average: 8.8,
    vote_count: 1782928,
    popularity: 33.095,
    original_language: "en",
    original_title: "Forrest Gump",
    adult: false,
    video: false,
    production_companies: [
      { id: 4, name: "Paramount", logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    tagline: "Life is like a box of chocolates...you never know what you're gonna get.",
    homepage: "",
    imdb_id: "tt0109830",
    revenue: 677387716,
    budget: 55000000,
    trailer_url: "https://www.youtube.com/embed/bLvqoHBptjg",
    cast: [
      { id: 31, name: "Tom Hanks", character: "Forrest Gump", profile_path: "/xndWFsBlClOJFRdhStQKDOLxnzy.jpg", order: 0 },
      { id: 32, name: "Robin Wright", character: "Jenny Curran", profile_path: "/8r9HYWHsQD2vPjSeNQpQiqbQCmF.jpg", order: 1 }
    ],
    crew: [
      { id: 33, name: "Robert Zemeckis", job: "Director", department: "Directing", profile_path: "/wXN0JXXmJZaRGYAW4iAVvoEn9a.jpg" },
      { id: 34, name: "Winston Groom", job: "Novel", department: "Writing", profile_path: null }
    ],
    keywords: [
      { id: 378, name: "prison" },
      { id: 703, name: "love" },
      { id: 818, name: "based on novel or book" }
    ]
  },
  {
    title: "Avatar",
    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    poster_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    backdrop_path: "/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    release_date: new Date("2009-12-15"),
    runtime: 162,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
      { id: 878, name: "Science Fiction" }
    ],
    vote_average: 7.6,
    vote_count: 12114,
    popularity: 185.070,
    original_language: "en",
    original_title: "Avatar",
    adult: false,
    video: false,
    production_companies: [
      { id: 5, name: "Columbia Pictures", logo_path: "/71BqEFAF4V3qPpPFqsAPmwnTf4G.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }, { iso_639_1: "es", name: "Español" }],
    status: "Released",
    tagline: "Enter the World of Pandora.",
    homepage: "",
    imdb_id: "tt0499549",
    revenue: 2923706026,
    budget: 237000000,
    trailer_url: "https://www.youtube.com/embed/5PSNL1qE6VY",
    cast: [
      { id: 65731, name: "Sam Worthington", character: "Jake Sully", profile_path: "/yVGF9FvDxTDPhGimTbZNfghpllW.jpg", order: 0 },
      { id: 8691, name: "Zoe Saldana", character: "Neytiri", profile_path: "/ofNrWiA2KDdqiNxFTLp51HcXUlp.jpg", order: 1 }
    ],
    crew: [
      { id: 2710, name: "James Cameron", job: "Director", department: "Directing", profile_path: "/9NAZnTjBQ9WcXAQEzZpKy6qMtc.jpg" },
      { id: 2710, name: "James Cameron", job: "Screenplay", department: "Writing", profile_path: "/9NAZnTjBQ9WcXAQEzZpKy6qMtc.jpg" }
    ],
    keywords: [
      { id: 1463, name: "culture clash" },
      { id: 2964, name: "future" },
      { id: 3386, name: "space war" }
    ]
  },
  {
    title: "Titanic",
    overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose falls in love with Jack Dawson, a young artist aboard the ship.",
    poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdrop_path: "/6VmFqApQRyZZzmiGOQq2C92WNT.jpg",
    release_date: new Date("1997-11-18"),
    runtime: 194,
    genres: [
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" }
    ],
    vote_average: 7.9,
    vote_count: 7770,
    popularity: 42.277,
    original_language: "en",
    original_title: "Titanic",
    adult: false,
    video: false,
    production_companies: [
      { id: 4, name: "Paramount", logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }, { iso_639_1: "fr", name: "Français" }, { iso_639_1: "de", name: "Deutsch" }],
    status: "Released",
    tagline: "Nothing on Earth could come between them.",
    homepage: "",
    imdb_id: "tt0120338",
    revenue: 2187463944,
    budget: 200000000,
    trailer_url: "https://www.youtube.com/embed/kVrqfYjkTdQ",
    cast: [
      { id: 204, name: "Leonardo DiCaprio", character: "Jack Dawson", profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg", order: 0 },
      { id: 1813, name: "Kate Winslet", character: "Rose DeWitt Bukater", profile_path: "/e3tdop3V0mbdEZzBNXKL1t3TdWJ.jpg", order: 1 }
    ],
    crew: [
      { id: 2710, name: "James Cameron", job: "Director", department: "Directing", profile_path: "/9NAZnTjBQ9WcXAQEzZpKy6qMtc.jpg" },
      { id: 2710, name: "James Cameron", job: "Screenplay", department: "Writing", profile_path: "/9NAZnTjBQ9WcXAQEzZpKy6qMtc.jpg" }
    ],
    keywords: [
      { id: 2580, name: "shipwreck" },
      { id: 2987, name: "ship" },
      { id: 387, name: "california" }
    ]
  },
  {
    title: "The Avengers",
    overview: "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster.",
    poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    release_date: new Date("2012-04-25"),
    runtime: 143,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" }
    ],
    vote_average: 7.7,
    vote_count: 18723,
    popularity: 98.082,
    original_language: "en",
    original_title: "The Avengers",
    adult: false,
    video: false,
    production_companies: [
      { id: 420, name: "Marvel Studios", logo_path: "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png", origin_country: "US" }
    ],
    production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    tagline: "Some assembly required.",
    homepage: "",
    imdb_id: "tt0848228",
    revenue: 1518815515,
    budget: 220000000,
    trailer_url: "https://www.youtube.com/embed/eOrNdBpGMv8",
    cast: [
      { id: 3223, name: "Robert Downey Jr.", character: "Tony Stark / Iron Man", profile_path: "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg", order: 0 },
      { id: 103, name: "Chris Evans", character: "Steve Rogers / Captain America", profile_path: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg", order: 1 }
    ],
    crew: [
      { id: 12891, name: "Joss Whedon", job: "Director", department: "Directing", profile_path: "/dTiVsuaTVTeGmvQ5ynkp9aeX7CK.jpg" },
      { id: 12891, name: "Joss Whedon", job: "Screenplay", department: "Writing", profile_path: "/dTiVsuaTVTeGmvQ5ynkp9aeX7CK.jpg" }
    ],
    keywords: [
      { id: 849, name: "dc comics" },
      { id: 9715, name: "superhero" },
      { id: 9717, name: "based on comic" }
    ]
  }
];

const seedMovies = async () => {
  try {
    console.log('Seeding movies...');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    // Insert mock movies
    const movies = await Movie.insertMany(mockMovies);
    console.log(`Successfully seeded ${movies.length} movies`);

    // Create relationships between movies (similar movies)
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const similarMovies = movies
        .filter((m, index) => {
          // Connect movies with similar genres or directors
          const hasCommonGenre = m.genres.some(g1 =>
            movie.genres.some(g2 => g1.name === g2.name)
          );
          const hasCommonDirector = m.crew.some(c1 =>
            movie.crew.some(c2 => c1.name === c2.name && c1.job === 'Director')
          );
          return index !== i && (hasCommonGenre || hasCommonDirector);
        })
        .slice(0, 3) // Limit to 3 similar movies
        .map(m => m._id);

      await Movie.findByIdAndUpdate(movie._id, {
        similar_movies: similarMovies
      });
    }

    console.log('Successfully created movie relationships');
    return movies;

  } catch (error) {
    console.error('Error seeding movies:', error);
    throw error;
  }
};

module.exports = seedMovies;
