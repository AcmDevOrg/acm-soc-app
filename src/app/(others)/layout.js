import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  src: ".././fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  src: ".././fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Acm Social Application",
  description: "Generated by create Acm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
