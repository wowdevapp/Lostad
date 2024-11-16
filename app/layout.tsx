import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from './store/ReduxProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();


  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${inter.className} overflow-hidden ${locale === 'ar' ? 'rtl text-right' : 'ltr text-left'}`}
      >
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <main>
              {children}
            </main>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
