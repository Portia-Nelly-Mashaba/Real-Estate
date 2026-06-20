import type { Metadata } from "next";
import { PhotoGalleryGrid } from "@/components/photo-gallery/PhotoGalleryGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PHOTO_GALLERY_PAGE } from "@/lib/data/photo-gallery";

export const metadata: Metadata = {
  title: "Gallery | Mashaba Property Investments",
  description: PHOTO_GALLERY_PAGE.description,
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="bg-gallery-content">
        <div className="gallery-header-band">
          <section className="page-container pb-8 pt-28 sm:pb-10 sm:pt-32">
            <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
              {PHOTO_GALLERY_PAGE.label}
            </p>
            <h1 className="mt-2 font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
              {PHOTO_GALLERY_PAGE.lead}
            </h1>
            <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">
              {PHOTO_GALLERY_PAGE.description}
            </p>

            <div className="mt-6">
              <PhotoGalleryGrid />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
