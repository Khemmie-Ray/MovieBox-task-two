import React from 'react'
import './App.css';
import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements, 
  RouterProvider 
} from "react-router-dom";
import Movies from './Pages/Movies';
import MovieDetails from './Pages/MovieDetails';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route index element={<Movies/>} />
  <Route path='/:movieId' element={<MovieDetails />} />
  </Route>
))

function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
  </div>
  )
}

export default App;