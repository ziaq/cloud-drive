import { useRouter } from "next/navigation";
import { useCurrentDirId } from "./use-current-dir-id";

export function useFsNavigation() {
  const router = useRouter();
  const currentDirId = useCurrentDirId();

  const openDirectory = (id: number) => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/\/$/, "");
      const newPath = path === "/" ? `/${id}` : `${path}/${id}`;
      router.push(newPath);
    } else {
      router.push(`/${id}`);
    }
  };

  const goBack = (parentId: number | null) => {
    if (!currentDirId) return;
    if (parentId) {
      const path = window.location.pathname.replace(/\/[^\/]+$/, "");
      router.push(path || "/");
    } else {
      router.push("/");
    }
  };

  return { openDirectory, goBack };
}
