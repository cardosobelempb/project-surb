import { Badge } from "@/components/ui/badge";

const modules = [
  "Delivery",
  "BioLink",
  "Agendamento",
  "Catálogo/Vitrine",
  "Pedidos",
  "Clientes",
  "Pagamentos Pix",
  "Painel administrativo",
];

export const ModulesSection = () => {
  return (
    <section id="modulos" className="relative overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-20 bg-background" />
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-surb-cyan/10 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-surb-green/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <Badge
              className="
            rounded-full
            border-0
            bg-linear-to-r
            from-surb-blue
            to-surb-cyan
            px-4
            py-1.5
            text-white
          "
            >
              Ecossistema SURB
            </Badge>

            <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
              Comece pequeno e evolua para uma
              <span className="text-gradient-surb"> plataforma completa</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A SURB acompanha o crescimento do seu negócio. Comece com uma página
              profissional e evolua para delivery, agenda online, catálogo digital,
              pagamentos e gestão empresarial.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-surb-green" />
                <span>Sem necessidade de trocar de plataforma</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-surb-cyan" />
                <span>Crescimento modular conforme sua necessidade</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-surb-blue" />
                <span>Tudo integrado em uma única conta</span>
              </div>
            </div>
          </div>

          {/* Right Modules */}
          <div className="grid gap-4 sm:grid-cols-2">
            {modules.map((module, index) => (
              <div
                key={module}
                className="
          group
          rounded-3xl
          border
          border-border/50
          bg-card/60
          p-6
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-surb-cyan/50
          hover:shadow-xl
          hover:shadow-cyan-500/10
        "
              >
                <div
                  className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-r
            from-surb-blue/20
            to-surb-cyan/20
          "
                >
                  <span className="font-bold text-surb-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-semibold">{module}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Integração completa com o ecossistema SURB.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
