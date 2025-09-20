import React, { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const texts = [
    "Welcome to FilmHub - Your Movie World!",
    "Dive into the Screen.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [randomBG, setRandomBG] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  let api_key = import.meta.env.VITE_API_KEY;
  let topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=5`;

  function toSearch() {
    nav(`/search/${search}`);
  }

  async function randomBackground() {
    try {
      let res = await axios.get(topRatedAPI);
      let { results } = res.data;
      let getBackdrop = results.map((el) => el.backdrop_path);
      setRandomBG(getBackdrop);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function task() {
      try {
        let res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=2`
        );
        console.log(res.data.results);
      } catch (err) {
        console.error(err);
      }
    }

    task(); // компонент ачылганда гана чакыруу
  }, []);

  const bgImage =
    randomBG.length > 0
      ? `https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/${randomBG[randomIndex]}`
      : "";
  useEffect(() => {
    randomBackground();
  }, []);

  useEffect(() => {
    if (randomBG.length > 0) {
      setRandomIndex(Math.floor(Math.random() * randomBG.length));
    }
  }, [randomBG]);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }

      // Кийинки аракеттер
      if (!isDeleting && charIndex + 1 === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex - 1 === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      id={styles.main}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.text}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </h1>
          <h3>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toSearch();
            }}
          >
            <input
              type="text"
              placeholder="Search for a movie, tv show, person....."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className={styles.search}
              disabled={!search.length}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className={styles.fullBG}></div>
    </section>
  );
};

export default Main;
