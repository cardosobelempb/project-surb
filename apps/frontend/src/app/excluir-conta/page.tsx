import { AlertTriangle, ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteAccountPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div>
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition hover:text-surb-cyan"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para início
          </Link>
        </div>
        <Badge variant="destructive">Exclusão de Conta</Badge>

        <h1 className="mt-6 text-5xl font-bold">Solicitar exclusão de conta</h1>

        <p className="mt-6 text-muted-foreground">
          Você pode solicitar a exclusão permanente da sua conta e dos seus dados pessoais
          armazenados pela SURB.
        </p>

        <Card className="mt-10 rounded-3xl">
          <CardContent className="p-8">
            <AlertTriangle className="mb-6 h-10 w-10 text-destructive" />

            <h2 className="text-xl font-semibold">Como solicitar a exclusão</h2>

            <ol className="mt-6 list-decimal space-y-4 pl-5 text-muted-foreground">
              <li>Envie um e-mail para privacidade@surb.com.br</li>
              <li>Informe o e-mail cadastrado na plataforma.</li>
              <li>Informe que deseja excluir sua conta.</li>
              <li>Aguarde a validação da identidade.</li>
              <li>Após validação a exclusão será processada.</li>
            </ol>

            <p className="mt-8 text-sm text-muted-foreground">
              Alguns dados poderão ser mantidos quando houver obrigação legal, regulatória
              ou fiscal.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
