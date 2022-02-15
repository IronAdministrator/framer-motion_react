import "./App.css";
import Movie from "./components/Movie";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=76f5e8837a414c71732955dc46be1df8&language=en-US&page=1"
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  return (
    <div className="App">
      <Filter />
      <div className="popular-movies">
        {popular.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}

export default App;
