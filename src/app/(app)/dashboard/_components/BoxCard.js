import styles from "./BoxCard.module.css";

function BoxCard({ icon, title, data }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span>{icon}</span>
        <p>{title}</p>
      </div>
      <h3>{data}</h3>
    </div>
  );
}

export default BoxCard;
