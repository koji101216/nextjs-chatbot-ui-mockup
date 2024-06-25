'use client';

import { Roboto } from "next/font/google";
import ThemeWrapper from '@/app/theme';
import { GlobalStateProvider } from '@/app/context/GlobalStateContext';

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={roboto.className}>
        <GlobalStateProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
