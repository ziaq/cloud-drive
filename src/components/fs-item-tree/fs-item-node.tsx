import type { FsItem } from "@/models/fs-item";
import styles from "./fs-item-tree.module.css";

type Props = {
  item: FsItem;
  onDirClick: (id: number) => void;
  onToggleFavorite: (id: number) => void;
};

export function FsItemNode({ item, onDirClick, onToggleFavorite }: Props) {
  return (
    <li className={styles.node}>
      {item.type === "dir" ? (
        <button className={styles.item} onClick={() => onDirClick(item.id)}>
          <span className={styles.emoji}>📁</span> {item.name}
        </button>
      ) : (
        <span className={styles.item}>
          <span className={styles.emoji}>📄</span> {item.name}
        </span>
      )}
      <button className={styles.favorite} onClick={() => onToggleFavorite(item.id)}>
        {item.isFavorite ? "★" : "☆"}
      </button>
    </li>
  );
}
