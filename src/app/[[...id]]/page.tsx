import styles from "./page.module.css";
import { FsItemTree } from "@/components/fs-item-tree";

export default function Home() {
  return (
    <main className={styles.page}>
      <FsItemTree />
    </main>
  );
}
