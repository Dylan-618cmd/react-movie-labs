import React from "react";
import { useParams } from 'react-router';
import { getRecommendations } from '../api/tmdb-api'
import { getMovie } from "../api/tmdb-api";
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
      <Typography variant="h4" sx={{mb : 0.5, textAlign: "center", padding: 4}}>
        Recommended Movies 
      </Typography>
      {movies.length === 0 && <p>No recommendations found for this movie.</p>}
      <MovieList movies={movies} action={() => {}} />
    </>
  );
};

export default RecommendedPage;