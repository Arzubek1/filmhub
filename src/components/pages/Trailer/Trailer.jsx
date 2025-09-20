import React from "react";
import scss from "./Trailer.module.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Trailer = ({ kinoID }) => {
  let api_key = import.meta.env.VITE_API_KEY;
  const [activeId, setActiveId] = useState(null);
  const [trailer, setTrailer] = useState([]);
  async function getTrailer(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${kinoID}/videos?api_key=${key}&language=en-US`
    );
    let { results } = res.data;
    setTrailer(results);
  }

  useEffect(() => {
    getTrailer(api_key);
  }, []);

  useEffect(() => {
    if (activeId) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // жылмакай скролл
      });
    }
  }, [activeId]);

  return (
    <section className={scss.Trailer}>
      <div className="container">
        <h2>Trailers</h2>
        <div className={scss.content}>
          {trailer.length ? (
            trailer.slice(0, 8).map((el) => (
              <div key={el.id} className={scss.block}>
                <iframe
                  src={`https://www.youtube.com/embed/${el.key}`}
                  className={`${scss.iframe} ${
                    activeId === el.id ? scss.iframeActive : ""
                  }`}
                />
              </div>
            ))
          ) : (
            <h2>Nothing Found...</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trailer;
