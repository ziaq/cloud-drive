import { create } from "zustand";
import { mapToFsTree } from "@/utils/map-to-fs-tree";
import { updateIsFavorite } from "@/utils/update-is-favorite";
import { FsItem } from "@/models/fs-item";
import { fetchFsItems, toggleFavoriteOnServer } from "@/api/fs-api";
import type { FsItemTree } from "@/types/fs-item-tree";

interface FsStoreState {
  fsTree: FsItemTree;
  isLoading: boolean;
  isFetchError: boolean;
  isFavoriteError: boolean;
  fetchAndSetFsItems: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
}

export const useFsStore = create<FsStoreState>((set, get) => ({
  fsTree: { fsItemsById: {}, rootFsItems: [] },
  isLoading: false,
  isFetchError: false,
  isFavoriteError: false,

  async fetchAndSetFsItems() {
    set({ isLoading: true, isFetchError: false });
    try {
      const rawFsItems = await fetchFsItems();
      const fsItems = rawFsItems.map(item => new FsItem(item));
      set({ fsTree: mapToFsTree(fsItems), isFetchError: false });
    } catch {
      set({ isFetchError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (id) => {
    const { fsTree } = get();
    const item = fsTree.fsItemsById[id];
    if (!item) return;

    const prevIsFavorite = item.isFavorite;

    set({
      fsTree: mapToFsTree(updateIsFavorite(fsTree.fsItemsById, id, !prevIsFavorite)),
      isFavoriteError: false,
    });

    // Optimistic update
    try {
      await toggleFavoriteOnServer(id, !prevIsFavorite);
    } catch {
      set({
        fsTree: mapToFsTree(updateIsFavorite(fsTree.fsItemsById, id, prevIsFavorite)),
        isFavoriteError: true,
      });
      setTimeout(() => set({ isFavoriteError: false }), 3000);
    }
  },
}));
