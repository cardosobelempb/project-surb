import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "../lib/utils";
import { siteConfig } from "./config/site-config";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.appName,
    template: `%s | ${siteConfig.appName}`,
  },

  description: siteConfig.description,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: siteConfig.appName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.appName,
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.appName,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full antialiased font-sans", poppins.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4756105986266133"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="facebook-domain-verification"
          content="5i2kg2rfk4zs09mv87jmecektjmbur"
        />
      </head>
      <body className="flex min-h-full flex-col  text-foreground">
        <ThemeProvider>
          <SiteHeader />

          <main className="min-h-screen flex-1 bg-surb-green/2">{children}</main>

          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
