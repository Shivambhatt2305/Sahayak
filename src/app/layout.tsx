import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahayak",
  description: "Your AI-powered educational assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
