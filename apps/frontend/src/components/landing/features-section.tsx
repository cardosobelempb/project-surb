import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Bike, CalendarDays, Link2, Package, Wallet } from "lucide-react";

const features = [
  {
    title: "Delivery",
    description: "Receba pedidos online e gerencie entregas em tempo real.",
    icon: Bike,
  },
  {
    title: "BioLink",
    description: "Centralize seus links, redes sociais e produtos.",
    icon: Link2,
  },
  {
    title: "Agenda Online",
    description: "Permita agendamentos automáticos 24 horas por dia.",
    icon: CalendarDays,
  },
  {
    title: "Catálogo Digital",
    description: "Exiba produtos e serviços com visual profissional.",
    icon: Package,
  },
  {
    title: "Pagamentos",
    description: "Receba via PIX, cartão e carteiras digitais.",
    icon: Wallet,
  },
  {
    title: "Gestão Comercial",
    description: "Acompanhe clientes, vendas e indicadores do negócio.",
    icon: BarChart3,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="solucoes" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <section className="relative overflow-hidden py-24">
        {/* Glow */}
        <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-surb-cyan/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-surb-green/10 blur-[120px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 -z-20 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
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
              Plataforma completa
            </Badge>

            <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
              Tudo que seu negócio precisa para
              <span className="text-gradient-surb"> vender, atender e crescer</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Delivery, BioLink, Agenda, Catálogo Digital, Pagamentos e Gestão Comercial
              integrados em uma única plataforma.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="
        group
        rounded-3xl
        border-border/50
        bg-card/60
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-surb-cyan/50
        hover:shadow-2xl
        hover:shadow-cyan-500/10
      "
              >
                <CardHeader>
                  <div
                    className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-r
            from-surb-blue/20
            to-surb-cyan/20
          "
                  >
                    <feature.icon
                      className="
              h-7
              w-7
              text-surb-cyan
              transition-transform
              duration-300
              group-hover:scale-110
            "
                    />
                  </div>

                  <CardTitle className="mt-5 text-xl">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="leading-7 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
