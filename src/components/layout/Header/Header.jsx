import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });
  return (
    <>
      <header className={`${styles.Header} ${hidden ? styles.hidden : ""}`}>
        <div className="container">
          <div className={styles.content}>
            <img
              src={logo}
              alt="FilmHub"
              className={styles.logo}
              onClick={() => nav("/")}
            />
            <nav className={styles.laptopNav}>
              <a className={styles.toMovie} onClick={() => nav("/movies")}>
                Movies
              </a>
              <a className={styles.toMovie} onClick={() => nav("/tvshow")}>
                TV Shows
              </a>
            </nav>

            {/* Burger Menu */}
            <div className={styles.burgerMenu}>
              <input
                type="checkbox"
                id="check-icon"
                className={styles.checkIcon}
                hidden
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
              />
              <label htmlFor="check-icon" className={styles.iconMenu}>
                <div className={`${styles.bar} ${styles.bar1}`}></div>
                <div className={`${styles.bar} ${styles.bar2}`}></div>
                <div className={`${styles.bar} ${styles.bar3}`}></div>
              </label>
            </div>
          </div>
        </div>
      </header>

      <nav className={`${styles.phoneNav} ${isOpen ? styles.active : ""}`}>
        <h3 onClick={() => {
          nav("/"); setIsOpen(false)
        }}>Home</h3>
        <h3 onClick={() => {
          nav("/movies"); setIsOpen(false)
        }}>Movies</h3>
        <h3 onClick={() => {
          nav("/tvshow"); setIsOpen(false)
        }}>TV Shows</h3>
      </nav>
    </>
  );
};

export default Header;
