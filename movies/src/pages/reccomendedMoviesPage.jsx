import React from "react";
import { useParams } from 'react-router';
import { getRecommendations } from '../api/tmdb-api'
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';

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
      <PageTemplate
        title="Recommended Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );
};

export default RecommendedPage;