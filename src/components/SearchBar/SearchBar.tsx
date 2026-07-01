import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface onSubmitProps {
  onSubmit: (String: string) => Promise<void>;
}

export default function SearchBar({ onSubmit }: onSubmitProps) {
  const handleSearc = (formData: FormData) => {
    const searchQery = (formData.get("query") as string).trim();
    if (searchQery) {
      onSubmit(searchQery);
    } else {
      const notify = () => toast("Please enter your search query", {});
      notify();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearc}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
        <Toaster />
      </div>
    </header>
  );
}
