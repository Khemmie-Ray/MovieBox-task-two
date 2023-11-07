import React, { useState, useEffect } from 'react';
import posterBg from '../assets/Poster.svg';
import imLogo from '../assets/imdb.svg'
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import Footer from '../components/Footer';

function Movies() {
  const [movieData, setMovieData] = useState([]);
  const [searchMovie, setSearchMovie]  = useState([]);
  // const [query,  setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
          {
            method: 'GET',
            cache: 'force-cache',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzViNDE4ZTcyMGI0NDk0ZDdkMDQ2OWExY2M4ZjZmZSIsInN1YiI6IjY1MDA5NGMwNTU0NWNhMDBmZWE2YjMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JHVLVRgITnuDtg9BlNFy7Aawslr5goZjUGc3K5lk1p0',
            },
          }
        );
        const data = await response.json();
        setMovieData(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const first10Movies = movieData.slice(0, 12);

  const MovieCard = first10Movies.map((info) => (
    <div key={info.id} className='card' data-testid='movie-card'>
     <Link key={info.id} to={`/${info.id}`}>
      <img src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`} alt="" data-testid='movie-poster' />
      <p data-testid='movie-release-date'>{info.release_date}</p>
      <h2 data-testid='movie-title'>{info.title}</h2>
      <div>
      <p className='vote'>{info.vote_average}</p>
        <img src={imLogo} alt="" />
      </div>
      </Link>
    </div>
  ));

//   function handleSearchMovie(event) {
//       setQuery(event.target.value);
//       console.log(query)
//   }

//   const searchMovieData = () => {
//     fetch(`https://www.omdbapi.com/?t=${query}&apikey=57b8a098`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data)
//         setSearchMovie(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
// console.log(searchMovie)

  // const MovieSearch = searchMovie.map((data) => (
  //             <div class="card">
  //               <p>Movie Search</p>
  //                   <img src={data.Poster} alt="" />
  //               <div class="movie-info" id="moviedata">
  //                   <h2>${data.Title}</h2>
  //                   <ul>
  //                       <li>Year: {data.Year}</li>
  //                       <li>Type: N/A</li>
  //                       <li>Ratings: {data.Rated}</li>
  //                       <li>Released: {data.Released}</li>
  //                   </ul>
  //                   <p>Genre: {data.Genre}</p>
  //                   <p>Language: {data.Language}.</p>
  //               </div>
  //               </div>))

  return (
    <>
      <section style={{ backgroundImage: `url(${posterBg})` }} className="heroBg">
      <header>
        <img src={logo} alt="" />
        <input type="text" 
        placeholder="search"
        />
        <div>
          <a href="Sign In">Sign In</a>
          <a href="#"><i className="ri-menu-line menu"></i></a>
        </div>
      </header>
        <div className="content">
          <h1>John Wick 3 : Parabellum</h1>
          <p>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
          <button>Watch Trailer <i className="ri-play-circle-fill"></i></button>
        </div>
      </section>
      <section>
        {/* {MovieSearch} */}
        </section>
      <section className='feature'>
        <h2>Featured Movies</h2>
        <div className="card-container">
        {MovieCard}
        </div>
      </section>
    <Footer />
    </>
  );
}

export default Movies;