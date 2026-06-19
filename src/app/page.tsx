import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />

      {/* Spacer content to demo scroll glass effect */}
      <section className="bg-background px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Scroll to see the mirror glass nav
          </h2>
          <p className="mt-4 text-muted">
            The navigation bar stays fixed at the top and transitions to a
            frosted glass effect as you scroll past the hero section.
          </p>
        </div>
      </section>
    </>
  );
}
