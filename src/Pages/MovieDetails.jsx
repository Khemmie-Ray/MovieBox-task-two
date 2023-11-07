import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../assets/movieLogo.svg';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          method: 'GET',
          cache: 'force-cache',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzViNDE4ZTcyMGI0NDk0ZDdkMDQ2OWExY2M4ZjZmZSIsInN1YiI6IjY1MDA5NGMwNTU0NWNhMDBmZWE2YjMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JHVLVRgITnuDtg9BlNFy7Aawslr5goZjUGc3K5lk1p0',
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
          {index < info.name.length - 1 && ' '}
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
                />
                <h2>
                    {movieDetails.title} . {movieDetails.release_date} .{' '}
                    {movieDetails.runtime} mins
                </h2>
                {movieGenres && <div>{movieGenres}</div>}
                <div>
                  <p><i class="ri-star-fill"></i> <span>{movieDetails && movieDetails.vote_average !== undefined ? movieDetails.vote_average.toFixed(1) : 'N/A'}</span> | {movieDetails && movieDetails.popularity !== undefined ? movieDetails.popularity.toFixed() : 'N/A'}</p>
                </div>
            </div>
        );
    }
    
  console.log(movieDetails)

    return (
      <section>
        <div className="sidebar">
          <img src={logo} alt="" />
          <ul>
            <li><a href="#"><i className="ri-home-4-fill"></i>Home</a></li>
            <li><a href=""><i className="ri-vidicon-fill">Movies</i></a></li>
            <li><a href=""><i className="ri-tv-fill"></i>TV Series</a></li>
            <li><a href=""><i className="ri-calendar-todo-fill"></i>Upcoming</a></li>
          </ul>
          <div>
           <h3>Play movie quizes and earn free tickets</h3>
           <p>50k people are playing now</p>
           <button>Start playing</button>
          </div>
        </div>
        <div>
          {details}
        </div>
      </section>
    );
}

export default MovieDetails