import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { UiProvider } from "@/contexts/UiContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EConex Group - Serviços Completos Angola",
  description:
    "Serviços de limpeza, manutenção, climatização, automóvel e piscinas em Angola. Soluções profissionais com atendimento 24/7.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>

      <body className={`${inter.variable} antialiased`}>
        <UiProvider>
          {children}
          <Toaster />
        </UiProvider>
      </body>
    </html>
  );
}
