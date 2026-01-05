import { AlarmClockCheck } from "lucide-react";
import Link from "next/link";
import styles from "./CreateJobBTN.module.css";

function CreateJobBTN() {
  return (
    <>
      <Link className={styles.link_btn} href="/jobs/create">
        <span>
          <AlarmClockCheck />
        </span>
        Create job
      </Link>
    </>
  );
}

export default CreateJobBTN;
