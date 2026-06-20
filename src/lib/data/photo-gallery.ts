import { FEATURED_AREAS } from "@/lib/data/areas";
import { ALL_PROPERTIES } from "@/lib/data/properties";

export type PhotoGalleryCategory = "all" | "homes" | "areas";

export interface PhotoGalleryItem {
  id: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  category: Exclude<PhotoGalleryCategory, "all">;
  href: string;
}

export const PHOTO_GALLERY_PAGE = {
  label: "Visual Gallery",
  lead: "A closer look.",
  description:
    "Interiors, architecture, and places from our current collection across South Africa.",
} as const;

export const PHOTO_GALLERY_FILTERS: { value: PhotoGalleryCategory; label: string }[] =
  [
    { value: "all", label: "All" },
    { value: "homes", label: "Homes" },
    { value: "areas", label: "Areas" },
  ];

const HOME_ITEMS: PhotoGalleryItem[] = ALL_PROPERTIES.map((property) => ({
  id: property.id,
  title: property.title,
  location: property.location,
  image: property.image,
  imageAlt: property.imageAlt,
  category: "homes",
  href: property.href,
}));

const AREA_ITEMS: PhotoGalleryItem[] = FEATURED_AREAS.map((area) => ({
  id: area.id,
  title: area.title,
  location: area.region,
  image: area.image,
  imageAlt: area.imageAlt,
  category: "areas",
  href: area.href,
}));

export const PHOTO_GALLERY_ITEMS: PhotoGalleryItem[] = [
  ...HOME_ITEMS,
  ...AREA_ITEMS,
];

export function filterPhotoGalleryItems(
  category: PhotoGalleryCategory,
): PhotoGalleryItem[] {
  if (category === "all") return PHOTO_GALLERY_ITEMS;
  return PHOTO_GALLERY_ITEMS.filter((item) => item.category === category);
}
