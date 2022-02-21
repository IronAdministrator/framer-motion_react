import "./App.css";
import { useEffect, useState, useRef } from "react";
import Movie from "./components/Movie";
import Filter from "./components/Filter";
import { motion, AnimatePresence } from "framer-motion";
import images from "./images";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

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

  // slider-animation start
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    console.log(
      carousel,
      carousel.current.scrollWidth,
      carousel.current.offsetWidth
    );
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  return (
    // filtering-animation start
    <div className="App">
      <div className="filtering-animation">
        <h1 className="main-header">Framer_Motion_React</h1>
        <h2>Filtering animation</h2>
        <Filter
          popular={popular}
          setFiltered={setFiltered}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
        />

        <motion.div layout className="popular-movies">
          <AnimatePresence>
            {filtered.map((movie) => {
              return <Movie key={movie.id} movie={movie} />;
            })}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* filtering-animation end */}
      {/* slider-animation start */}
      <div className="slider-animation">
        <h2>Slider animation</h2>
        <motion.div
          ref={carousel}
          className="outer-carousel"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            {images.map((image) => {
              return (
                <motion.div className="item" key={image}>
                  <img src={image} alt="pexels-img" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      {/* slider-animation-end */}
    </div>
  );
}

export default App;
