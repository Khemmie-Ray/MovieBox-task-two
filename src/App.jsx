import { useState } from 'react'
import './App.css'
import posterBg from './assets/Poster.svg'
import logo from './assets/Logo.svg'

function App() {
  const [movieData, setMovieData] = useState([])

  const options = {
    method: 'GET',
      cache: "force-cache",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzViNDE4ZTcyMGI0NDk0ZDdkMDQ2OWExY2M4ZjZmZSIsInN1YiI6IjY1MDA5NGMwNTU0NWNhMDBmZWE2YjMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JHVLVRgITnuDtg9BlNFy7Aawslr5goZjUGc3K5lk1p0'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setMovieData(data)
    })
    .catch(err => console.error(err));

  return (
    <>
    <section style={{ backgroundImage: `url(${posterBg})` }} className='heroBg'>
      <header>
        <img src={logo} alt="" />
        <input type="text" placeholder='search' />
        <div>
          <a href="Sign In"></a>
          <a href=""><i class="ri-menu-line"></i></a>
        </div>
      </header>
      <div className="content">
        <h1>John Wick 3 : Parabellum</h1>
        <p>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
        <button>Watch Trailer<i class="ri-play-circle-fill"></i></button>
      </div>
    </section>
      
      
    </>
  )
}

export default App
