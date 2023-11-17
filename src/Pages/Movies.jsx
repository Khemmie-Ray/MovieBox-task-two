import React, { useState, useEffect } from 'react';
import posterBg from '../assets/Poster.svg';
import imLogo from '../assets/imdb.svg'
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import Footer from '../components/Footer';


function Movies() {
  const [movieData, setMovieData] = useState([]);
  const [query,  setQuery] = useState('');
  const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;
  const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchSearchData();
}, [query]);

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
                `Bearer ${apiKey}`,
            },
          }
        );
        const data = await response.json();
        setMovieData(data.results.slice(0, 12));
        setLoading(false); 
      } catch (err) {
        console.error(err);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const MovieCard = loading ? (
    <p>Loading...</p>
  ) : (movieData.map((info) => (
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
    </div>)
  ));

const fetchSearchData = () => {
  
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}`,
          {
            method: 'GET',
            cache: 'force-cache',
            headers: {
              accept: 'application/json',
              Authorization:
                `Bearer ${apiKey}`,
            },
          }
        ).then(res => res.json())
        .then(data => {
          setMovieData(data.results.slice(0, 12))
        })
        .catch((err) => {
              console.error(err);
        })
}

function handleSearchMovie(event) {
  setQuery(event.target.value);
}

  return (
    <>
      <section style={{ backgroundImage: `url(${posterBg})` }} className="heroBg">
      <header>
        <img src={logo} alt="" />
        <input type="text" 
        placeholder="search"
        value={query}
        onChange={handleSearchMovie}
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