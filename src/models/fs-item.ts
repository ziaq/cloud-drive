import type { FsItemDto, FsItemType } from "@/types/fs-item-dto";
import {
  FsItemExtension,
  isFsItemExtension,
  isFsImageExtension,
} from "@/constants/fs-extensions";

export class FsItem {
  id: number;
  type: FsItemType;
  parentId: number | null;
  name: string;
  isFavorite: boolean;
  children: FsItem[] = [];
  extension: FsItemExtension | null = null;

  constructor(data: FsItemDto) {
    this.id = data.id;
    this.type = data.type;
    this.parentId = data.parentId;
    this.name = data.name;
    this.isFavorite = data.isFavorite;

    if (this.type === "file") {
      const ext = this.name.split(".").pop()?.toLowerCase();
      if (isFsItemExtension(ext)) {
        this.extension = ext;
      }
    }
  }

  isImage(): boolean {
    return !!this.extension && isFsImageExtension(this.extension);
  }
}

export function isFsItem(obj: unknown): obj is FsItem {
  return obj instanceof FsItem;
}
