export const FS_ITEM_EXTENSIONS = ["jpg", "png", "pdf", "docx"] as const;
export type FsItemExtension = typeof FS_ITEM_EXTENSIONS[number];

export function isFsItemExtension(ext: unknown): ext is FsItemExtension {
  return (
    typeof ext === "string" &&
    FS_ITEM_EXTENSIONS.some((allowedExtension) => allowedExtension === ext)
  );
}

export const FS_IMAGE_EXTENSIONS = FS_ITEM_EXTENSIONS.filter(
  (allowedExtension): allowedExtension is FsItemExtension =>
    allowedExtension === "jpg" || allowedExtension === "png"
);
export type FsImageExtension = typeof FS_IMAGE_EXTENSIONS[number];

export function isFsImageExtension(ext: unknown): ext is FsImageExtension {
  return (
    typeof ext === "string" &&
    FS_IMAGE_EXTENSIONS.some((imageExtension) => imageExtension === ext)
  );
}
