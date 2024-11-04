import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Skyline Artifact",
  description: "Welcome, designers of web in next 10 years",
};

export default function RootLayout({ 
  nav,
  children 
}: Readonly <{ 
  nav: React.ReactNode
  children: React.ReactNode 
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>
            {nav}
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}