import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section id="contato" className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-0 top-0 -z-10 h-100 w-100 rounded-full bg-surb-cyan/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 -z-10 h-100 w-100 rounded-full bg-surb-green/20 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-white/10
        bg-surb-gradient
        p-10
        shadow-2xl
        lg:p-16
      "
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <Badge
                className="
          mb-6
          rounded-full
          border-white/20
          bg-white/10
          px-4
          py-1.5
          text-white
          backdrop-blur-md
        "
              >
                Comece hoje mesmo
              </Badge>

              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Pronto para transformar seu negócio em uma operação digital moderna?
              </h2>

              <p className="mt-6 max-w-2xl text-lg text-white/80">
                Crie sua presença digital, receba pedidos, organize agendamentos, gerencie
                clientes e aumente suas vendas com a plataforma SURB.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="
            rounded-2xl
            bg-white
            text-surb-navy
            hover:bg-white/90
          "
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="
            rounded-2xl
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-md
            hover:bg-white/20
          "
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/70">Plataforma</p>

                <p className="mt-2 text-3xl font-bold text-white">100%</p>

                <p className="mt-1 text-white/70">Online</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/70">Módulos</p>

                <p className="mt-2 text-3xl font-bold text-white">8+</p>

                <p className="mt-1 text-white/70">Integrados</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/70">Atendimento</p>

                <p className="mt-2 text-3xl font-bold text-white">24h</p>

                <p className="mt-1 text-white/70">Disponível</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/70">Crescimento</p>

                <p className="mt-2 text-3xl font-bold text-white">Escalável</p>

                <p className="mt-1 text-white/70">Conforme seu negócio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
