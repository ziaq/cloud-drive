import type { FsItemTree } from "@/types/fs-item-tree";
import { FsItem } from "@/models/fs-item";

// Converts a flat array of FsItem to a tree structure and also returns a lookup object
export function mapToFsTree(fsItems: FsItem[]): FsItemTree {
  const fsItemsById: Record<number, FsItem> = {};

  fsItems.forEach(fsItem => {
    fsItemsById[fsItem.id] = fsItem;
    fsItem.children = [];
  });

  Object.values(fsItemsById).forEach(fsItem => {
    if (fsItem.parentId !== null) {
      const parent = fsItemsById[fsItem.parentId];
      if (parent) {
        parent.children.push(fsItem);
      }
    }
  });

  const allFsItems = Object.values(fsItemsById);
  const rootFsItems = allFsItems.filter(fsItem => fsItem.parentId === null);

  return { fsItemsById, rootFsItems };
}
