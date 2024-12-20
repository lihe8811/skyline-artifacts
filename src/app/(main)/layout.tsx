import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/global.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Skyline Artifact',
  description: 'Welcome, designers of web in next 10 years',
};

export default function RootLayout({ 
  children 
}: Readonly <{ 
  children: React.ReactNode 
}>) {
  return (
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>{children}</main>
        </body>
      </html>
  )
}