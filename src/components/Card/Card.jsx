import axios from "axios";
import styles from "./Card.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieDetails } from "@/redux/mainSlice";
import { motion } from "framer-motion";
import logo from "@/assets/images/logo.png";
const Card = ({ el }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const percentage = Math.round(el.vote_average * 10);
  let api_key = import.meta.env.VITE_API_KEY;

  let color = "";
  if (percentage >= 70) {
    color = "#21d07a";
  } else if (percentage >= 40) {
    color = "#d2d531";
  } else {
    color = "#db2360";
  }

  const handleClick = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${el.id}?api_key=${api_key}&language=en-US`
    );
    dispatch(getMovieDetails(res.data));
    nav(`/MDetails/${el.id}`);
  };

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

  return (
    <div className={styles.card} onClick={() => handleClick()}>
      <div className={styles.image}>
        {el.poster_path ? (
          <img
            src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${el.poster_path}`}
            alt={el.title}
          />
        ) : (
          <img src={logo} alt="img" />
        )}
        <div className={styles.bg}></div>
        <div className={styles.genres}>
          {el.genre_ids?.slice(0, 3).map((id, index) => (
            <span key={id} className={index === 0 ? "active" : ""}>
              {genreMap[id]}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1>
          {el.title.length > 19 ? el.title.slice(0, 18) + "..." : el.title}
        </h1>
        <h4>{el.release_date}</h4>
      </div>
      <div className={styles.circularProgressbar}>
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
    </div>
  );
};

export default Card;
