import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import scss from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={scss.footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.brand}>
            <h2>FilmHub</h2>
            <p>Discover. Watch. Enjoy.</p>
          </div>

          <ul className={scss.links}>
            <li><a href="/">Home</a></li>
            <li><a href="/movies">Movies</a></li>
            <li><a href="/#">Series</a></li>
            <li><a href="/#">About</a></li>
            <li><a href="/#">Contact</a></li>
          </ul>

          <div className={scss.socials}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className={scss.copy}>
          <p>© {new Date().getFullYear()} FilmHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
