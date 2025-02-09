import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from "../contexts/ModalContext";
import CookieConsent from "../components/CookieConsent";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ADAMS - Automated Digital Marketing Solution',
  description: 'Accurate & efficient way to grow your website SEO easily.',
  icons: '/img/favico.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <ModalProvider>
          <body className={inter.className}>{children}
          <CookieConsent />
          </body>
        </ModalProvider>
    </html>
  );
}