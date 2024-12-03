import styles from "./page.module.css";
import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return <div className={styles.page}>Home...</div>;
}
