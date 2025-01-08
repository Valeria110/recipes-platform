import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import { Header } from '@/widgets/layout/ui/client';
import { Footer } from '@/widgets/layout/ui/server';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${poppins.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
