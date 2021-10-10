import React from 'react'
import { Link } from 'react-router-dom';

export default function Movies({movies, favs,addFavourite}) {
  const AddFavs = favs

  return (
    <div className="row">
      {movies?.map( movie=>(
        <div key={movie.imdbID} className="col align-self-center image-container -d-flex justify-content-start m-3"> 
        <Link className="thumbnail" to={`/movies/${movie.imdbID}`}>
          <img src={movie.Poster} alt="movie_poster" />
        </Link>  
          <div onClick={()=>addFavourite(movie)} 
          className="overlay d-flex align-items-center justify-content-center">
          <AddFavs/>
          </div>
        </div>
      ))
      }
    </div>
  )
}
