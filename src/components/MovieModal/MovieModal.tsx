import { useEffect } from "react";
import css from "./MovieModal.module.css";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ onClose, movie }: ModalProps) {
  useEffect(() => {
    const handlerEscape = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handlerEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handlerEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handlerMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handlerMouseClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:{movie.release_date}</strong>{" "}
            movie_release_date
          </p>
          <p>
            <strong>Rating:{movie.vote_average}</strong> movie_vote_average/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default MovieModal;
