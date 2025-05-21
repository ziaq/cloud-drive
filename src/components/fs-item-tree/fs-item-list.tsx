import { FsItemNode } from "./fs-item-node";
import type { FsItem } from "@/models/fs-item";

type Props = {
  items: FsItem[];
  onDirClick: (id: number) => void;
  onToggleFavorite: (id: number) => void;
};

export function FsItemList({ items, onDirClick, onToggleFavorite }: Props) {
  return (
    <ul>
      {items.map(item => (
        <FsItemNode
          key={item.id}
          item={item}
          onDirClick={onDirClick}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}
