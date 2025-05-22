import type { FsItem } from "@/models/fs-item";

export interface FsItemTree {
  fsItemsById: Record<number, FsItem>;
  rootFsItems: FsItem[];
}
