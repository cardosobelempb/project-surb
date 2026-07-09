import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Start",
    price: "R$ 49",
    description: "Para começar sua presença digital.",
    features: [
      "BioLink profissional",
      "Links ilimitados",
      "Contato via WhatsApp",
      "Página pública",
    ],
  },
  {
    name: "Pro",
    price: "R$ 99",
    description: "Para vender, agendar e divulgar serviços.",
    featured: true,
    features: [
      "Tudo do Start",
      "Catálogo digital",
      "Agenda online",
      "Dashboard básico",
      "Suporte prioritário",
    ],
  },
  {
    name: "Business",
    price: "Sob consulta",
    description: "Para empresas que precisam de solução completa.",
    features: [
      "Delivery",
      "Pagamentos",
      "Gestão comercial",
      "Sistema personalizado",
      "Integrações",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/50 py-24">
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-surb-cyan/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-surb-green/10 blur-[130px]" />

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
            Planos SURB
          </Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Escolha o plano ideal para seu negócio crescer no digital
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Comece simples com BioLink e evolua para catálogo, agenda, delivery,
            pagamentos e sistemas personalizados.
          </p>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`rounded-3xl border-border/50 bg-card/70 backdrop-blur-xl ${
                  plan.featured ? "border-surb-cyan shadow-2xl shadow-cyan-500/10" : ""
                }`}
              >
                <CardHeader>
                  {plan.featured && (
                    <Badge className="mb-4 w-fit rounded-full bg-surb-gradient text-white">
                      Mais recomendado
                    </Badge>
                  )}

                  <CardTitle className="text-2xl">{plan.name}</CardTitle>

                  <p className="text-muted-foreground">{plan.description}</p>

                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Sob consulta" && (
                      <span className="text-muted-foreground">/mês</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check className="mt-0.5 h-5 w-5 text-surb-green" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="mt-8 w-full rounded-2xl bg-surb-gradient text-white"
                  >
                    <Link href="/contato">
                      Solicitar plano
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
