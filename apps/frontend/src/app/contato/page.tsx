import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-surb-cyan/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 -z-10 h-96 w-96 rounded-full" />

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
          <Badge className="bg-surb-gradient text-white">Entre em contato</Badge>

          <h1 className="mt-6 text-5xl font-bold">Vamos conversar sobre seu projeto</h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Tire dúvidas, solicite uma demonstração ou fale com nossa equipe.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <Mail className="mb-4 h-8 w-8 text-surb-cyan" />
                <h3 className="font-semibold">E-mail</h3>
                <p className="mt-2 text-muted-foreground">contato@surb.com.br</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <Phone className="mb-4 h-8 w-8 text-surb-green" />
                <h3 className="font-semibold">Telefone</h3>
                <p className="mt-2 text-muted-foreground">+55 (83) 99999-9999</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <MessageCircle className="mb-4 h-8 w-8 text-surb-blue" />
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="mt-2 text-muted-foreground">Atendimento rápido</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <Button size="lg" className="bg-surb-gradient rounded-2xl text-white">
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
