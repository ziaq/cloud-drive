import type { FsItemDto } from "@/types/fs-item-dto";
import { fsItemDtoMock } from "@/mocks/fs-item-dto-mock";

export async function fetchFsItems(): Promise<FsItemDto[]> {
  // Mock implementation of fetchFsItems
  await new Promise(res => setTimeout(res, 500));
  return fsItemDtoMock;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function toggleFavoriteOnServer(id: number, isFavorite: boolean): Promise<void> {
  // Mock implementation of toggleFavoriteOnServer
  await new Promise(res => setTimeout(res, 300));
}
