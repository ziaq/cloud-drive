'use client';

import { useEffect, useState } from "react";
import { useFsStore } from "@/store/fs-store";
import { FsItemList } from "./fs-item-list";
import styles from "./fs-item-tree.module.css";

export function FsItemTree() {
  const [currentDirId, setCurrentDirId] = useState<number | null>(null);

  const {
    fsTree,
    isLoading,
    isFetchError,
    isFavoriteError,
    fetchAndSetFsItems,
    toggleFavorite,
  } = useFsStore();

  useEffect(() => {
    fetchAndSetFsItems();
  }, [fetchAndSetFsItems]);

  if (isLoading) return <div className={styles.state}>Loading...</div>;
  if (isFetchError) return <div className={styles.state}>Failed to load files</div>;
  if (!fsTree.rootFsItems.length) return <div className={styles.state}>No files</div>;

  const items = currentDirId
    ? fsTree.fsItemsById[currentDirId]?.children || []
    : fsTree.rootFsItems;

  return (
    <div className={styles.tree}>
      {isFavoriteError && (
        <div className={styles.error}>Не удалось обновить избранное</div>
      )}

      <div className={styles['file-list']}>
        <FsItemList
          items={items}
          onDirClick={setCurrentDirId}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {currentDirId && (
        <button
          className={styles.back}
          onClick={() =>
            setCurrentDirId(fsTree.fsItemsById[currentDirId]?.parentId ?? null)
          }
        >
          Назад
        </button>
      )}
    </div>
  );
}
