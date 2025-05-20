import { FsItem } from "@/models/fs-item";

// Updates isFavorite field for FsItem
export function updateIsFavorite(
  fsItemsById: Record<number, FsItem>,
  id: number,
  value: boolean
): FsItem[] {
  return Object.values(fsItemsById).map(fsItem =>
    fsItem.id === id
      ? new FsItem({ ...fsItem, isFavorite: value })
      : fsItem
  );
}
