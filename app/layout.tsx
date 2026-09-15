import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body className="bg-green text-dark">
        <Toaster
          containerStyle={{
            top: 10,
          }}
          toastOptions={{
            className:
              "font-semibold tracking-wide rounded-2xl shadow-xl border border-gray-100",
            duration: 7000,

            success: {
              style: {
                borderRadius: "15px",
                border: "3px solid bg-green-medium",
                padding: "16px",
              },
            },
            error: {
              style: {
                borderRadius: "15px",
                border: "3px solid #EF4444",
                padding: "16px",
              },
            },
          }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
