import React, { useEffect, useState } from "react";
import scss from "./MovieDetails.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getMovieDetails } from "@/redux/mainSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Actors from "./actors/Actors";
import { IoIosPlayCircle } from "react-icons/io";
import Trailer from "../Trailer/Trailer";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const [trailer, setTrailer] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const { MID } = useParams();
  const { md } = useSelector((s) => s.firstReducer);
  let api_key = import.meta.env.VITE_API_KEY;

  async function getMDetails() {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${MID}?api_key=${api_key}&language=en-US`
    );
    return dispatch(getMovieDetails(res.data));
  }
  async function getTrailer(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${MID}/videos?api_key=${key}&language=en-US`
    );
    let { results } = res.data;
    setTrailer(results);
  }
  const watch = trailer.slice(0, 1);

  useEffect(() => {
    getMDetails();
    getTrailer(api_key);
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [isActive]);

  const percentage = Math.round(md.vote_average * 10);

  let color = "";
  if (percentage >= 70) {
    color = "#21d07a";
  } else if (percentage >= 40) {
    color = "#d2d531";
  } else {
    color = "#db2360";
  }

useEffect(() => {
  if(isActive){
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
  return () => {
    document.body.style.overflow = "auto"
  }
}, [isActive])

  return (
    <>
      <section
        id={scss.movieDetails}
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/${md.backdrop_path})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className={scss.content}>
          <div className={scss.image}>
            <img
              src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${md.poster_path}`}
              alt={md.title}
            />
          </div>
          <div className={scss.info}>
            <h1>
              {md.title?.length > 50 ? md.title.slice(0, 50) + "..." : md.title}
            </h1>

            <div className={scss.dates}>
              <h4>
                Release Date: <span>{md.release_date}</span>
              </h4>
              <h4>
                Runtime:{" "}
                <span>
                  {md.runtime
                    ? `${Math.floor(md.runtime / 60)}h ${md.runtime % 60}min`
                    : "N/A"}
                </span>
              </h4>
            </div>
            <div className={scss.genres}>
              {md.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <div className={scss.play}>
              <div className={scss.circularProgressbar}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    textSize: "28px",
                    textColor: "#fff",
                    pathColor: color,
                    trailColor: "#204529",
                  })}
                />
              </div>
              <h3>Rating</h3>

              <div className={scss.buttons}>
                <button
                  className={scss.playBtn}
                  title="watch trailer"
                  onClick={() => watch.length && setIsActive(true)}
                >
                  <IoIosPlayCircle />
                </button>
                <h3 className={scss.btnWatch} onClick={() => watch.length && setIsActive(true)}>
                  Watch Trailer
                </h3>
              </div>
            </div>
            <div className={scss.overview}>
              <h3>Overview</h3>
              <p>{md.overview || "No description available."}</p>
            </div>
          </div>
        </div>
        {watch.map((el) => (
          <div className={scss.watchBG} style={{display: isActive ? "flex": "none"}}>
            <div className={scss.watch}>
              <iframe
                src={`https://www.youtube.com/embed/${el.key}`}
                frameborder="0"
              ></iframe>
              <p onClick={() => setIsActive(false)}>close</p>
            </div>
          </div>
        ))}
      </section>
      <Actors kinoID={MID} />
      <Trailer kinoID={MID} />
    </>
  );
};

export default MovieDetails;
