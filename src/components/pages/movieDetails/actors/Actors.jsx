import React, { useEffect, useRef, useState } from "react";
import scss from "./Actors.module.scss";
import axios from "axios";
import img1 from "@/assets/images/img1.png"
import img2 from "@/assets/images/img2.avif"


const Actors = ({ kinoID }) => {
  let api_key = import.meta.env.VITE_API_KEY;
  const [actors, setActors] = useState([]);
  async function getActors(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${kinoID}/credits?api_key=${key}&language=en-US`
    );
    let { data } = res;
    setActors(data.cast);
  }

  useEffect(() => {
    getActors(api_key);
  }, [api_key]);





  return (
    <section className={scss.actors}>
      <div className="container">
          <h2>Actors</h2>
        <div className={scss.content}>
          <div className={scss.blockWrapper}>
            {actors.map((el) => (
              <div key={el.id} className={scss.block}>
                {el.profile_path !== null ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${el.profile_path}`}
                    alt="profile"
                  />
                ) : (
                  <>
                    {el.gender === 1 && <img src={img2} alt="female" />}
                    {(el.gender === 2 || el.gender === 0) && (
                      <img src={img1} alt="male" />
                    )}
                  </>
                )}

                <div className={scss.info}>
                  <h3>
                    {el.original_name.length > 14
                      ? el.original_name.slice(0, 14) + "..."
                      : el.original_name}
                  </h3>
                  <h4>
                    {el.character.length > 16
                      ? el.character.slice(0, 16) + "..."
                      : el.character}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actors;
