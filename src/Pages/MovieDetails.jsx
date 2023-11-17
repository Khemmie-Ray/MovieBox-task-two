import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../assets/movieLogo.svg';
import posterBg from '../assets/moviebg.svg';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          method: 'GET',
          cache: 'force-cache',
          headers: {
            accept: 'application/json',
            Authorization:
              `Bearer ${apiKey}`,
          }
        }). then(res => res.json())
        .then(data => {
        setMovieDetails(data)})
    }, [movieId])
    
    let movieGenres = null;
    if (movieDetails && movieDetails.genres) {
        movieGenres = movieDetails.genres.map((info, index) => (
          <span key={info.id}>
          {info.name}
          {index < info.name.length - 1 && ' . '}
      </span>
        ));
    }

    let details = null;
    if (movieDetails) {
        details = (
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                    alt=""
                    className='poster-img'
                />
                <div className='subtitle'>
                <h2>
                    {movieDetails.title} . {movieDetails.release_date} .{' '}
                    {movieDetails.runtime} mins
                </h2>
                {movieGenres && <div className='genre'>{movieGenres}</div>}
                <div className='rating'>
                  <p><i class="ri-star-fill"></i> <span className='vote'>{movieDetails && movieDetails.vote_average !== undefined ? movieDetails.vote_average.toFixed(1) : 'N/A'}</span> | {movieDetails && movieDetails.popularity !== undefined ? movieDetails.popularity.toFixed() : 'N/A'}k</p>
                </div>
                </div>
            </div>
        );
    }

    return (
      <section className='details-container'>
        <div className="sidebar">
          <nav>
            <Link to='/'><img src={logo} alt="" className='side-logo'/></Link>
          <i className="ri-menu-2-line hamburger" onClick={toggleMenu}></i>
          </nav>
          <ul className={`navlinks ${isMenuOpen ? 'show' : 'hide'}`}>
            <li><a href="#"><i className="ri-home-4-fill"></i>Home</a></li>
            <li className='active'><a href="#"><i className="ri-vidicon-fill"></i>Movies</a></li>
            <li><a href="#"><i className="ri-tv-fill"></i>TV Series</a></li>
            <li><a href="#"><i className="ri-calendar-todo-fill"></i>Upcoming</a></li>
          </ul>
          <div className='quiz-card'>
           <h3>Play movie quizes and earn free tickets</h3>
           <p>50k people are playing now</p>
           <button>Start playing</button>
          </div>
        </div>
        <div className='details-card'>
          {details}
          <section className='overview-card'>
            <div className='overview'>
          {movieDetails && (
            <div>
              <p>{movieDetails.overview}</p>
            </div>
          )}
            </div>
            <div className='options-card'>
              <button className='btn-showtime'><i class="ri-coupon-line"></i> See Showtimes</button>
              <button className='btn-option'><i className="ri-list-check"></i> Watch more options</button>
              <img src={posterBg} alt="" className='poster-bg'/>
            </div>
            </section>
        </div>
      </section>
    );
}

export default MovieDetails