import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "1. Aceitação",
    content:
      "Ao acessar ou utilizar qualquer serviço da SURB, o usuário declara que leu, compreendeu e concorda com estes Termos de Uso.",
  },
  {
    title: "2. Serviços oferecidos",
    content:
      "A SURB oferece soluções digitais incluindo Delivery, BioLink, Agenda, Gestão, Pagamentos, Sistemas personalizados, APIs e integrações.",
  },
  {
    title: "3. Cadastro",
    content:
      "O usuário é responsável por informar dados verdadeiros, manter seus dados atualizados, proteger suas credenciais de acesso e não compartilhar senhas.",
  },
  {
    title: "4. Responsabilidades do usuário",
    content:
      "É proibido utilizar a plataforma para atividades ilegais, tentar acessar áreas não autorizadas, realizar ataques, explorar vulnerabilidades ou violar direitos de terceiros.",
  },
  {
    title: "5. Planos e pagamentos",
    content:
      "Alguns serviços poderão ser oferecidos mediante assinatura mensal, anual ou contratação personalizada. Pagamentos poderão ser processados por terceiros autorizados.",
  },
  {
    title: "6. Cancelamento",
    content:
      "O usuário poderá cancelar sua assinatura conforme as condições do plano contratado. A SURB poderá suspender ou cancelar contas que descumpram estes Termos.",
  },
  {
    title: "7. Disponibilidade",
    content:
      "A SURB busca manter seus serviços disponíveis continuamente, porém não garante funcionamento ininterrupto. Manutenções, atualizações e falhas técnicas podem ocorrer.",
  },
  {
    title: "8. Propriedade intelectual",
    content:
      "Todos os direitos relacionados à marca SURB, sistemas, interfaces, códigos, conteúdos e materiais pertencem à SURB ou seus licenciadores.",
  },
  {
    title: "9. Limitação de responsabilidade",
    content:
      "A SURB não será responsável por uso inadequado da plataforma, danos causados por terceiros, interrupções fora de seu controle ou falhas de provedores externos.",
  },
  {
    title: "10. Integrações de terceiros",
    content:
      "A plataforma poderá integrar serviços de terceiros como Meta, Facebook, Instagram, WhatsApp, Google e Mercado Pago. O uso desses serviços também estará sujeito às políticas dos respectivos fornecedores.",
  },
  {
    title: "11. Alterações dos termos",
    content:
      "Estes Termos poderão ser atualizados periodicamente. O uso contínuo da plataforma após alterações representa concordância com a nova versão.",
  },
  {
    title: "12. Foro",
    content:
      "Fica eleito o foro da comarca do domicílio da SURB para dirimir eventuais controvérsias, observadas as disposições legais aplicáveis.",
  },
];

export default function TermsPage() {
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
            Documento legal
          </Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Termos de Uso
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Estes Termos regulam o acesso e uso dos serviços digitais da SURB Tecnologia
            Urbana, incluindo Delivery, BioLink, Agenda, Gestão, Pagamentos, Sistemas
            personalizados, APIs e integrações.
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/50 bg-card/70 p-4 text-sm text-muted-foreground backdrop-blur-xl">
            <ShieldCheck className="h-5 w-5 text-surb-cyan" />
            Última atualização: 01/06/2026
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        
        <Card className="rounded-3xl border-border/50 bg-card/70 shadow-xl backdrop-blur-xl">
          <CardContent className="space-y-10 p-6 md:p-10">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-3 leading-8 text-muted-foreground">{section.content}</p>
              </article>
            ))}

            <article>
              <h2 className="text-xl font-bold">13. Contato</h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail{" "}
                <a
                  href="mailto:contato@surb.com.br"
                  className="font-medium text-surb-cyan hover:underline"
                >
                  contato@surb.com.br
                </a>
                .
              </p>
            </article>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
