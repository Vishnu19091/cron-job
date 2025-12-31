import { getDatabases } from "./appwrite";

const databaseId = process.env.DATABASE_ID;
const LOGS_COLLECTION_ID = process.env.LOGS_COLLECTION_ID;
const JOBS_COLLECTION_ID = process.env.JOBS_COLLECTION_ID;

export async function getUserJobs() {
  const db = getDatabases();

  log(
    db.listDocuments({
      databaseId,
      tableId: JOBS_COLLECTION_ID,
    })
  );
}
