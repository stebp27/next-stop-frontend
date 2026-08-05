import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">
        Oops, this page doesn't seem to exist.
      </p>
      <Link to="/" className="not-found__link">
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
