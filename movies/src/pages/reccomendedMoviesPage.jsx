import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getRecommendations } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import MovieList from "../components/movieList";
import Typography from "@mui/material/Typography";

const RecommendedPage = () => {
  const { id } = useParams();
 
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['recommendations', {id: id}],
    queryFn: getRecommendations,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

 const movies = data?.results || [];

  return (
    <>
      <Typography variant="h4" sx={{mb : 2}}>
        Recommended Movies
      </Typography>
      {movies.length === 0 && <p>No recommendations found for this movie.</p>}
      <MovieList movies={movies} />
    </>
  );
};

export default RecommendedPage;