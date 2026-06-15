import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eco Vista Linda",
  description: "Plataforma com orientações sobre descarte responsável",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-green text-dark"></body>
      <main>{children}</main>
    </html>
  );
}
