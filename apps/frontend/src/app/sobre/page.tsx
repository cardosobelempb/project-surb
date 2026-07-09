import { ArrowLeft, ArrowRight, Building2, Code2, Network, Rocket } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    title: "Tecnologia urbana",
    description: "Criamos soluções digitais para conectar negócios, serviços e cidades.",
    icon: Building2,
  },
  {
    title: "Software sob medida",
    description: "Desenvolvemos sistemas, dashboards, automações e plataformas SaaS.",
    icon: Code2,
  },
  {
    title: "Ecossistema integrado",
    description: "Delivery, BioLink, Agenda, Gestão e Pagamentos em uma base escalável.",
    icon: Network,
  },
  {
    title: "Crescimento digital",
    description: "Ajudamos negócios locais a vender mais e atender melhor.",
    icon: Rocket,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/50 py-24">
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-surb-cyan/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-surb-green/10 blur-[120px]" />

        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center text-sm text-muted-foreground transition hover:text-surb-cyan"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para início
            </Link>
          </div>

          <Badge className="rounded-full bg-surb-gradient px-4 py-1.5 text-white">
            Sobre a SURB
          </Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Tecnologia que conecta serviços, pessoas e cidades
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            A SURB Tecnologia Urbana nasceu para transformar negócios locais em operações
            digitais modernas, unindo delivery, BioLink, agenda, gestão, pagamentos e
            criação de sistemas personalizados.
          </p>
          <Button asChild className="mt-10 rounded-2xl bg-surb-gradient text-white">
            <Link href="/contato">
              Falar com a SURB
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => (
            <Card key={item.title} className="rounded-3xl border-border/50 bg-card/70">
              <CardContent className="p-6">
                <item.icon className="mb-5 h-8 w-8 text-surb-cyan" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2rem] border border-border/50 bg-card/70 p-8 shadow-xl backdrop-blur-xl md:p-12">
          <h2 className="text-3xl font-bold">Nossa missão</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Democratizar o acesso à tecnologia para profissionais, pequenos negócios,
            prestadores de serviços e empresas urbanas, oferecendo ferramentas simples,
            modernas e escaláveis para vender, atender, agendar, gerenciar e crescer no
            digital.
          </p>
        </div>
      </section>
    </>
  );
}
