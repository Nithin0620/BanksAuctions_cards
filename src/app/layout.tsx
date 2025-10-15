// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] }); 

export const metadata = {
  title: "Your App Name",
  description: "Your App description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Toaster/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
