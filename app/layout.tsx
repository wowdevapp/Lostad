import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from './store/ReduxProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Losstad',
  description: 'Losstad is a platform where you can find your instructor.',
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html dir={`${locale === 'ar' ? 'rtl' : 'ltr'}`} lang={locale}>
      <body
        suppressHydrationWarning
        className={`${inter.className} overflow-hidden ${locale === 'ar' ? 'text-right' : 'text-left'}`}
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
