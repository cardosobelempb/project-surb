import { siteConfig } from "@/app/config/site-config";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Produto: [
    { label: "Delivery", href: "/solucoes/delivery" },
    { label: "BioLink", href: "/solucoes/biolink" },
    { label: "Agenda", href: "/solucoes/agendamento" },
    { label: "Sistemas", href: "/solucoes/sistemas" },
  ],
  Empresa: [
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Preços", href: "/precos" },
  ],
  Legal: [
    { label: "Termos de Uso", href: `${siteConfig.url}/termos` },
    { label: "Privacidade", href: `${siteConfig.url}/privacidade` },
    { label: "Excluir Conta", href: `${siteConfig.url}/excluir-conta` },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-surb-cyan/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-surb-green/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/brand-white.png" alt="SURB" width={48} height={48} priority />
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surb-gradient text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
            S
          </div> */}

              <div className="leading-tight">
                <p className="text-lg font-bold tracking-tight">SURB</p>
                <p className="text-xs text-muted-foreground">Tecnologia Urbana</p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
              Tecnologia que conecta serviços, negócios e cidades. Delivery, BioLink,
              Agenda, Gestão e Sistemas em uma plataforma moderna.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold">{title}</h3>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition hover:text-surb-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} SURB Tecnologia Urbana. Todos os direitos
            reservados.
          </p>

          <p>Feito para negócios locais crescerem no digital.</p>
        </div>
      </div>
    </footer>
  );
}
