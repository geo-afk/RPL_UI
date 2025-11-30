import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../auth/authContext";
import ThemeProvider from "@/theme/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const Locations = [
  {name: 'Login', path: '/login'},
  {name: 'FileManager', path: '/file-browser'},
  {name: 'RPL Editor', path: '/rpl_editor'},
  {name: 'Roles', path: '/roles'},
  {name: 'DatabaseViewer', path: '/database'},
  {name: 'Access Checker', path: '/simulation'},
  {name: 'Audit Logs', path: '/audit'},
  {name: 'AI Insights', path: '/insights'},
  {name: 'Dashboard', path: '/dashboard'},
  {name: 'User Details', path: '/user_page'},
  {name: 'API Explorer', path: '/api_explorer'}
]


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          {children}
        </body>
      </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
