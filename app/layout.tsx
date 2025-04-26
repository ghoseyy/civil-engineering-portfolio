import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { RefreshProvider } from './context/RefreshContext';
import RefreshButton from './components/RefreshButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sandhya Thapa | Civil Engineering Portfolio',
  description: 'Portfolio website showcasing civil engineering projects and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <RefreshProvider>
            {children}
            <RefreshButton />
          </RefreshProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 