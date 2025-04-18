import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import { Header } from '@/widgets/layout/ui/client';
import { Footer } from '@/widgets/layout/ui/server';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/config';
import { notFound } from 'next/navigation';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Recipe platform',
  description: 'Recipe platform where users can share their recipes and inspire each other',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${poppins.variable} scroll-smooth`}>
      <body>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
