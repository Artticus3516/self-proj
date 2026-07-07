"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useCallback, useEffect, useRef, useState } from "react";

export function PortfolioShell() {
  const [activeSection, setActiveSection] = useState("home");
  const mainRef = useRef<HTMLElement>(null);

  const updateActiveSection = useCallback(() => {
    const sections = ["home", "projects", "contact"];
    const scrollOffset = (mainRef.current?.clientHeight ?? window.innerHeight) * 0.35;

    for (let index = sections.length - 1; index >= 0; index -= 1) {
      const section = document.getElementById(sections[index]);
      if (!section) continue;

      const top = section.getBoundingClientRect().top;
      if (top <= scrollOffset) {
        setActiveSection(sections[index]);
        return;
      }
    }

    setActiveSection("home");
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    updateActiveSection();
    main.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => main.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <MobileNav activeSection={activeSection} />

      <main
        ref={mainRef}
        className="pointer-events-auto h-[100dvh] overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        aria-label="Portfolio content"
      >
        <div className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-6">
          <section
            id="home"
            className="flex min-h-[calc(100dvh-var(--nav-height)-env(safe-area-inset-top))] scroll-mt-[calc(var(--nav-height)+1rem)] flex-col justify-end pb-10 pt-[calc(var(--nav-height)+env(safe-area-inset-top)+1.5rem)]"
          >
            <div className="max-w-2xl space-y-4">
              <p className="text-xs tracking-[0.3em] text-white/45 uppercase">
                3D Portfolio
              </p>
              <h1 className="text-3xl leading-tight font-semibold text-white sm:text-5xl">
                Spatial experiences for web and mobile.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                Scroll to explore selected projects or reach out to collaborate on
                immersive interfaces.
              </p>
            </div>
          </section>

          <div className="flex flex-col gap-16 pb-8 sm:gap-20">
            <ProjectGrid />
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
