import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesListing } from "@/components/gallery/PropertiesListing";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "All Properties | Mashaba Property Investments",
  description:
    "Browse luxury homes for sale across South Africa — Cape Town, Johannesburg, Durban, and the Winelands.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="bg-gallery-content">
        <div className="gallery-header-band">
          <section className="page-container pb-8 pt-28 sm:pb-10 sm:pt-32">
            <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
              Collection
            </p>
            <h1 className="mt-2 font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
              All properties
            </h1>

            <div className="mt-6">
              <Suspense fallback={null}>
                <PropertiesListing />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
