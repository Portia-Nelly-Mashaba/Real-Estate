import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CONTACT_PAGE } from "@/lib/data/contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: CONTACT_PAGE.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-brown-light">
        <section className="page-container pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <div>
              <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
                {CONTACT_PAGE.label}
              </p>
              <h1 className="mt-2 max-w-xl font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
                {CONTACT_PAGE.lead}
              </h1>
              <p className="mt-4 max-w-md text-sm text-muted">
                {CONTACT_PAGE.description}
              </p>

              <div className="mt-10 lg:mt-12">
                <ContactInfo />
              </div>
            </div>

            <div className="lg:pt-14">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
