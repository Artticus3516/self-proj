"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";

interface MobileNavProps {
  activeSection?: string;
}

export function MobileNav({ activeSection = "home" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleNavClick = useCallback(
    (href: string) => {
      closeMenu();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [closeMenu],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-[var(--nav-height)] max-w-6xl items-center justify-between px-4 pt-[env(safe-area-inset-top)] sm:px-6">
        <a
          href="#home"
          className="pointer-events-auto text-sm font-semibold tracking-[0.2em] text-white/90 uppercase"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home");
          }}
        >
          Portfolio
        </a>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/55"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-30 transition-opacity duration-200 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
          onClick={closeMenu}
          tabIndex={isOpen ? 0 : -1}
        />

        <nav
          aria-label="Primary"
          className={`absolute top-[calc(var(--nav-height)+env(safe-area-inset-top))] right-4 left-4 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl transition-transform duration-200 sm:right-6 sm:left-auto sm:w-72 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(item.href);
                    }}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
