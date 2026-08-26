import type { Metadata } from "next";
import { Outfit } from 'next/font/google';
import AuthProvider from "@/context/page";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Blurt',
  description: 'Real feedback from real people.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
};


interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} bg-[#F0F0F0] text-[#121212] antialiased selection:bg-[#F0C020] selection:text-[#121212]`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
