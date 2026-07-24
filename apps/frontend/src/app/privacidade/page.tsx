import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "1. Quem somos",
    content:
      "A SURB Tecnologia Urbana é uma plataforma digital que oferece soluções para delivery, biolink, agendamentos, pagamentos, gestão de negócios e desenvolvimento de sistemas.",
  },
  {
    title: "2. Dados coletados",
    content:
      "Podemos coletar dados fornecidos pelo usuário, como nome, sobrenome, e-mail, telefone, CPF quando necessário, endereço e dados de perfil. Também podemos coletar dados técnicos, como IP, navegador, sistema operacional, cookies, logs de acesso e identificadores de dispositivo.",
  },
  {
    title: "3. Dados obtidos por integrações",
    content:
      "Quando o usuário utilizar Login Social ou integrações autorizadas, poderemos receber informações do Facebook, Google, Instagram ou WhatsApp Business, como nome, e-mail, foto de perfil, identificadores públicos e dados necessários para comunicação.",
  },
  {
    title: "4. Finalidade do tratamento",
    content:
      "Utilizamos os dados para criar contas, autenticar usuários, executar contratos, processar pagamentos, prestar suporte, melhorar a plataforma, cumprir obrigações legais, prevenir fraudes e enviar comunicações importantes.",
  },
  {
    title: "5. Bases legais LGPD",
    content:
      "Tratamos dados pessoais com base no consentimento, execução de contrato, cumprimento de obrigação legal, legítimo interesse e exercício regular de direitos, conforme aplicável.",
  },
  {
    title: "6. Compartilhamento de dados",
    content:
      "Os dados poderão ser compartilhados com fornecedores e parceiros necessários para funcionamento da plataforma, incluindo Meta Platforms, Google LLC, Mercado Pago, serviços de hospedagem, e-mail, análise, segurança e autoridades competentes quando exigido por lei. A SURB não vende dados pessoais.",
  },
  {
    title: "7. Transferência internacional",
    content:
      "Alguns dados podem ser processados em servidores localizados fora do Brasil, incluindo fornecedores internacionais de tecnologia, hospedagem, autenticação, comunicação e análise.",
  },
  {
    title: "8. Segurança",
    content:
      "Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acesso não autorizado, alteração indevida, divulgação, perda, destruição ou uso inadequado.",
  },
  {
    title: "9. Direitos do titular",
    content:
      "O usuário poderá solicitar confirmação do tratamento, acesso aos dados, correção, portabilidade, exclusão, anonimização, informação sobre compartilhamento e revogação do consentimento.",
  },
  {
    title: "10. Exclusão de conta e dados",
    content:
      "O usuário poderá solicitar a exclusão da conta através da página https://surb.com.br/excluir-conta ou pelo e-mail privacidade@surb.com.br. Após a solicitação, os dados serão removidos ou anonimizados, exceto quando houver obrigação legal de retenção.",
  },
  {
    title: "11. Cookies",
    content:
      "Utilizamos cookies para autenticação, segurança, preferências, estatísticas, análise de navegação e melhoria da experiência do usuário. O usuário poderá configurar seu navegador para bloquear cookies.",
  },
];

const closingSections = [
  {
    title: "13. Alterações desta política",
    content:
      "A SURB poderá atualizar esta Política de Privacidade periodicamente. Alterações relevantes poderão ser comunicadas aos usuários por canais oficiais.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
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
            Privacidade e LGPD
          </Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Política de Privacidade
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Esta Política explica como a SURB Tecnologia Urbana coleta, utiliza, armazena,
            compartilha e protege dados pessoais relacionados ao uso de seus serviços
            digitais.
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/50 bg-card/70 p-4 text-sm text-muted-foreground backdrop-blur-xl">
            <LockKeyhole className="h-5 w-5 text-surb-cyan" />
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
              <h2 className="text-xl font-bold">
                12. Publicidade e cookies de terceiros (Google AdSense)
              </h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Este site utiliza o Google AdSense para exibir anúncios. O Google, como
                fornecedor terceiro, e outros parceiros publicitários utilizam cookies
                (incluindo o cookie DART) para veicular anúncios com base em visitas
                anteriores do usuário a este site e a outros sites na internet. O uso de
                cookies de publicidade pelo Google é regido pela{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-surb-cyan hover:underline"
                >
                  Política de Tecnologias de Anúncios do Google
                </a>
                . O usuário pode desativar a publicidade personalizada acessando as{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-surb-cyan hover:underline"
                >
                  Configurações de Anúncios do Google
                </a>
                , ou desativar o uso de cookies de outros fornecedores para fins de
                publicidade personalizada em{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-surb-cyan hover:underline"
                >
                  aboutads.info/choices
                </a>
                . Também é possível bloquear ou apagar cookies diretamente nas
                configurações do navegador, sem prejuízo ao uso básico do site.
              </p>
            </article>

            {closingSections.map((section) => (
              <article key={section.title}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-3 leading-8 text-muted-foreground">{section.content}</p>
              </article>
            ))}

            <article>
              <h2 className="text-xl font-bold">14. Contato</h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Para dúvidas, solicitações ou informações sobre privacidade, entre em
                contato pelo e-mail{" "}
                <a
                  href="mailto:privacidade@surb.com.br"
                  className="font-medium text-surb-cyan hover:underline"
                >
                  privacidade@surb.com.br
                </a>
                .
              </p>
            </article>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
