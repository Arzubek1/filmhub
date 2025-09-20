import React, { useEffect, useState } from "react";
import scss from "./Movies.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/Card/Card";
import { getTop140Movies } from "@/redux/mainSlice";
import { AnimatePresence, motion } from "framer-motion";

const Movies = () => {
  const [select, setSelect] = useState("All");
  const dispatch = useDispatch();
  const { movies } = useSelector((s) => s.firstReducer);
console.log(movies, "movies");

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    dispatch(getTop140Movies());
  }, [dispatch]);

  // фильтрленген массив
  const filteredMovies =
    select === "All"
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.some((id) => genreMap[id] === select)
        );

  return (
    <section id={scss.Movies}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <h2>Movies</h2>
            <div className={scss.category}>
              <h3>category</h3>
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option value="All">All</option>
                {Object.values(genreMap).map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <div className={scss.movies}>
              {filteredMovies.map((el, idx) => (
                <motion.div
                  key={el.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card el={el} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Movies;
