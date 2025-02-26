import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from "../contexts/ModalContext";
import CookieConsent from "../components/CookieConsent";
import GAnalytics  from "../components/googleanalytics/analytics";
import Script from "next/script";

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
       <head>
        {/* Google Tag Manager (Script) */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PC5CNR9K');
          `}
        </Script>
      </head>
        <ModalProvider>
          <GAnalytics />
          <body className={inter.className}>{children}
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-PC5CNR9K"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          <CookieConsent />
          </body>
        </ModalProvider>
    </html>
  );
}