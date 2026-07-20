"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS = NAV_LINKS.filter((link) => link.href !== "/donate");

/**
 * Floating premium header — scroll-aware glass bar, animated active state,
 * and a full-viewport mobile menu.
 */
export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
        <motion.nav
          aria-label="Primary"
          initial={false}
          animate={{
            height: scrolled ? 64 : 72,
            backgroundColor: scrolled
              ? "hsla(0, 0%, 100%, 0.92)"
              : "hsla(0, 0%, 100%, 0.72)",
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 36 }
          }
          className={cn(
            "pointer-events-auto mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border px-3 backdrop-blur-2xl sm:px-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
            scrolled
              ? "border-primary/10 shadow-lift"
              : "border-white/60 shadow-soft",
          )}
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 justify-self-start"
            onClick={() => setIsOpen(false)}
          >
            <span
              className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-[1.03]"
              aria-hidden="true"
            >
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />
              <span className="font-display text-[13px] font-bold tracking-[0.08em]">
                DGD
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-[15px] font-semibold leading-tight tracking-tight text-primary sm:text-base">
                Divine Gospel Delight
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:block">
                Foundation
              </span>
            </span>
            <span className="sr-only">{SITE_NAME}</span>
            {/* <Image
              src="/logo.png"
              alt="Divine Gospel Delight Foundation"
              width={150}
              height={150}
              className="border"
            /> */}
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {PRIMARY_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative z-10 block px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 lg:px-4",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-xl bg-primary/[0.06]"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                      />
                    )}
                    <span className="relative">
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 34 }
                          }
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-end gap-2 justify-self-end">
            <Link
              href="/donate"
              className="group relative hidden h-10 items-center gap-1.5 overflow-hidden rounded-xl bg-accent px-4 text-[13px] font-bold tracking-wide text-accent-foreground shadow-soft transition-all duration-300 hover:shadow-lift sm:inline-flex lg:px-5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Donate</span>
              <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-primary transition-colors hover:bg-primary/[0.06] md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <X className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute inset-x-3 top-[4.75rem] overflow-hidden rounded-3xl border border-white/50 bg-card/95 shadow-lift backdrop-blur-2xl sm:inset-x-5"
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: -12, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 0.98 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 360, damping: 32 }
              }
            >
              <div className="flex flex-col px-5 pb-6 pt-4">
                <ul className="flex flex-col">
                  {PRIMARY_LINKS.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <motion.li
                        key={link.href}
                        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : 0.05 + index * 0.05,
                          duration: 0.35,
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between border-b border-border/50 py-4 font-display text-2xl font-semibold tracking-tight transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-foreground/70 hover:text-primary",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="flex items-center gap-3">
                            {isActive && (
                              <span
                                className="h-5 w-0.5 shrink-0 bg-accent"
                                aria-hidden="true"
                              />
                            )}
                            {link.label}
                          </span>
                          <ArrowUpRight
                            className={cn(
                              "h-5 w-5 transition-opacity",
                              isActive ? "opacity-100" : "opacity-30",
                            )}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  className="mt-6"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.28,
                    duration: 0.35,
                  }}
                >
                  <Link
                    href="/donate"
                    onClick={() => setIsOpen(false)}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-accent text-base font-bold tracking-wide text-accent-foreground shadow-soft"
                  >
                    Donate Now
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so page content clears the fixed floating bar */}
      <div className="h-[5.25rem] sm:h-[5.5rem]" aria-hidden="true" />
    </>
  );
}
