import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import "./movieSearch.css"
const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
 

  const searchMovies = async () => {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await response.json();
      console.log(data)
      setMovies(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


 

  const showMovieDetails = async (movieId) => {
    
    try {
      const response = await fetch(
       `https://api.tvmaze.com/shows/${movieId}`
      );
      
      const data = await response.json();
      console.log(data)
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    searchMovies()
    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
    <div className='container'>
        
        <div className='headers'>
        <h1>Movie Search</h1>
        <input
        type="text"
        placeholder="Enter a movie title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        </div>
      <div className='movie_block'>
      <div className="movie_list">
      {movies.length > 0 ? (
      <div className="search-results">
        
        {movies.map((movie) => (
            
            
          <div
           
            key={movie.id}
            className="movie-card"
            onClick={() => showMovieDetails( movie.show.id)}
          >
            <div className='item_container'>
            <img className='show-image' src={ movie && movie.show.image ? movie.show.image.medium : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=200" } alt={movie.name} />
            
            <h2>{movie && movie.show.name}</h2>
            </div>
            
          </div>
        ))}
      </div>
      ) : <h1>No movies found</h1>}
      </div>
      <div className='movie_details'>
      {selectedMovie && (
      
        <div className="block-details">
          <h2>{selectedMovie.name}</h2>
          <p><strong>Type:</strong> {selectedMovie.type}</p>
          <p><strong>Language: </strong>{selectedMovie.language}</p>
          <p><strong>Genres:</strong> {selectedMovie.genres.join(', ')}</p>
          <p><strong>Genres:</strong>Genres: {selectedMovie.premiered}</p>
          <strong>Summary</strong>{ selectedMovie.summary ?  parse(selectedMovie.summary) : "null"}
          
          <p><strong>Status: </strong>{selectedMovie.status}</p>
          <p><strong>Runtime: </strong>{selectedMovie.runtime} minutes</p>
          <p><strong>Official Site: </strong>{selectedMovie.officialSite}</p>
        </div>
        
      )}
      </div>
    </div>
   
    </div>
   
  );
};

export default MovieSearch;
