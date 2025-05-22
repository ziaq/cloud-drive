import { useParams } from "next/navigation";

export function useCurrentDirId(): number | null {
  const { id } = useParams() as { id?: string | string[] };

  if (!id) return null;
  if (Array.isArray(id)) {
    const last = id[id.length - 1];
    const num = Number(last);
    return Number.isNaN(num) ? null : num;
  }
  const num = Number(id);
  return Number.isNaN(num) ? null : num;
}
