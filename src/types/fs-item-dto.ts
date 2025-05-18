export type FsItemType = "dir" | "file";

export interface FsItemDto {
  id: number;
  type: FsItemType;
  parentId: number | null;
  name: string;
  isFavorite: boolean;
}
