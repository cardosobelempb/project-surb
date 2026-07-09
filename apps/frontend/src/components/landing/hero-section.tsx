import { envFrontend } from "@/app/config/env-frontend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Package } from "lucide-react";
import { ProgressControlled } from "../progress-controlled";

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border/50">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-background" />

      {/* Glow Effects */}

      <div className="absolute right-0 top-0 -z-10 h-125 w-125 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-green-500/15 blur-[120px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <Badge
              className="
            mb-6
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
              Plataforma completa para negócios urbanos
            </Badge>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
              Transforme seu negócio em uma
              <span className="bg-linear-to-r from-surb-cyan to-surb-green bg-clip-text text-transparent">
                {" "}
                operação digital inteligente
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              O {envFrontend.SHORT_NAME} conecta delivery, biolink, agendamentos, catálogo
              digital, pagamentos e gestão em uma plataforma moderna para vender mais e
              atender melhor.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="
          rounded-2xl
          bg-linear-to-r
          from-surb-blue
          via-surb-cyan
          to-surb-green
          text-white
          shadow-lg
          shadow-cyan-500/20
        "
              >
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
          rounded-2xl
          border-border/50
          bg-background/50
          backdrop-blur-md
        "
              >
                Ver módulos
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span>✓ Delivery</span>
              <span>✓ Agendamentos</span>
              <span>✓ BioLink</span>
              <span>✓ Catálogo Digital</span>
              <span>✓ Gestão</span>
            </div>
          </div>

          {/* Right */}
          <Card
            className="
      overflow-hidden
      rounded-3xl
      border-border/50
      bg-card/70
      shadow-2xl
      backdrop-blur-xl
    "
          >
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-2xl">
                Painel SURB
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="rounded-3xl bg-linear-to-r from-surb-blue to-surb-cyan p-6 text-white">
                <p className="text-sm opacity-80">Faturamento do dia</p>

                <p className="mt-2 text-4xl font-bold">R$ 4.580</p>

                <p className="mt-2 text-sm opacity-80">+18% comparado a ontem</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border p-4">
                  <Package className="mb-3 h-5 w-5 text-surb-cyan" />

                  <p className="font-medium">Catálogo Ativo</p>

                  <p className="text-sm text-muted-foreground">Produtos e serviços</p>
                </div>

                <div className="rounded-2xl border p-4">
                  <CalendarDays className="mb-3 h-5 w-5 text-surb-green" />

                  <p className="font-medium">Agenda Online</p>

                  <p className="text-sm text-muted-foreground">Horários organizados</p>
                </div>
              </div>

              <div className="rounded-2xl border p-4">
                <div className="mb-4 flex justify-between">
                  <span>Pedidos concluídos</span>
                  <span className="font-bold">128</span>
                </div>

                <ProgressControlled />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
