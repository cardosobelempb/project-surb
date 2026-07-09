"use client";

import { Button } from "@/components/ui/button";
// import brandImage from "brand-white.png";
import { ArrowRight, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Recursos", href: "#recursos" },
  { label: "Módulos", href: "#modulos" },
  { label: "Contato", href: "/contato" },
];

const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
  },
);

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const visibleNavItems = pathName === "/" ? navItems : [];

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <Image src="/brand-white.png" alt="SURB" width={48} height={48} priority />
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surb-gradient text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
            S
          </div> */}

          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight">SURB</p>
            <p className="text-xs text-muted-foreground">Tecnologia Urbana</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {visibleNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="rounded-2xl">
            Entrar
          </Button>

          <Button className="rounded-2xl bg-surb-gradient text-white shadow-lg shadow-cyan-500/20">
            Começar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <Menu className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="border-t border-border/50 bg-background/95 px-6 py-6 shadow-xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            <div className="mt-4 ml-2">
              <ThemeToggle />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 grid gap-3">
            <Button variant="outline" className="rounded-2xl">
              Entrar
            </Button>

            <Button className="rounded-2xl bg-surb-gradient text-white">
              Começar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
