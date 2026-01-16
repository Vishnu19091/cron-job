import styles from "./Spinner.module.css";

export default function Spinner({ message }) {
  return (
    <div className="flex flex-col items-center">
      <div className={styles.spinner}></div>
      {message && <p>{message}</p>}
    </div>
  );
}
