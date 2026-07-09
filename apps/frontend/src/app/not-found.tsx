import { Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-surb-cyan/10 blur-[120px]" />
      <div className="absolute left-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-surb-green/10 blur-[120px]" />

      <div className="text-center">
        <p className="text-surb-cyan text-sm font-semibold">ERROR 404</p>

        <h1 className="mt-4 text-7xl font-bold">Página não encontrada</h1>

        <p className="mt-6 max-w-lg text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>

        <Button asChild className="bg-surb-gradient mt-10 rounded-2xl text-white">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Voltar para início
          </Link>
        </Button>
      </div>
    </main>
  );
}
