import style from "./layout.module.css";

export default function Page({ children }) {
  return (
    <div className={style.auth_bg}>
      <h3 className={style.title}>Cron-job</h3>
      <div className={style.layout_container}>
        <section>{children}</section>
      </div>
    </div>
  );
}
