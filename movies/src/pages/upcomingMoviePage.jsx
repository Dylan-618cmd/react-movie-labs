import React from "react";
import { getMovies } from "../api/tmdb-api";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const UpcomingMoviesPage = () => {

    const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};

const movies = data.results;

// Redundant, but necessary to avoid app crashing.
const favorites = movies.filter(m => m.favorite)
localStorage.setItem('favorites', JSON.stringify(favorites))
const addToFavorites = (movieId) => true 



   return (
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );
  
};

export default UpcomingMoviesPage;