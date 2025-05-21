'use client';

import { useEffect } from "react";
import { useFsStore } from "@/store/fs-store";
import { FsItemList } from "./fs-item-list";
import { useCurrentDirId } from "@/hooks/use-current-dir-id";
import { useFsNavigation } from "@/hooks/use-fs-navigation";
import styles from "./fs-item-tree.module.css";

export function FsItemTree() {
  const currentDirId = useCurrentDirId();
  const { openDirectory, goBack } = useFsNavigation();

  const {
    fsTree,
    isLoading,
    isFetchError,
    isFavoriteError,
    fetchAndSetFsItems,
    toggleFavorite,
  } = useFsStore();

  useEffect(() => {
    if (!fsTree.rootFsItems.length) {
      fetchAndSetFsItems();
    }
  }, [fetchAndSetFsItems, fsTree.rootFsItems.length]);

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
          onDirClick={openDirectory}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {currentDirId && (
        <button
          className={styles.back}
          onClick={() =>
            goBack(fsTree.fsItemsById[currentDirId]?.parentId ?? null)
          }
        >
          Назад
        </button>
      )}
    </div>
  );
}
