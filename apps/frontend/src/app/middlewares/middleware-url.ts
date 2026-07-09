import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  console.log(hostname);

  return NextResponse.next();
}

/**
surb.com.br
bio.surb.com.br
agenda.surb.com.br
delivery.surb.com.br
 */

/*
Exemplo de subdomínios:
- bio.surb.com.br
- agenda.surb.com.br
- delivery.surb.com.br

Exemplo de URL:
- https://bio.surb.com.br/fulano
- https://agenda.surb.com.br/fulano
- https://delivery.surb.com.br/fulano 

Exemplo de URL sem subdomínio:
- https://surb.com.br/fulano

Exemplo usando localhost:
const hostname = headers().get("host");
if (hostname?.startsWith("bio.")) {
  // BioLink
}

if (hostname?.startsWith("agenda.")) {
  // Agenda
}
*/
