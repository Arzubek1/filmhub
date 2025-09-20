import React, { useEffect } from "react";
import scss from "./TVShows.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTop140Movies } from "@/redux/mainSlice";
import Card from "@/components/Card/Card";
const TVShows = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((s) => s.firstReducer);

  const tvshow = movies.filter((el) => el.genre_ids.includes(10770));

  useEffect(() => {
    dispatch(getTop140Movies());
  }, [dispatch]);
  return (
    <section className={scss.TVShows}>
      <div className="container">
        <h2>TV Shows</h2>
        <div className={scss.content}>
            {tvshow.map((el, idx) => (
                <Card el={el} key={idx}/>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TVShows;
