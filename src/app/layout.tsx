import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LG Radar Dashboard",
  description: "Government gazette monitoring and alert system for Western Australia",
  keywords: ["government gazette", "monitoring", "alerts", "western australia", "legal notices"],
  authors: [{ name: "LG Radar" }],
  creator: "LG Radar",
  publisher: "LG Radar",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://wa.lgradar.com.au",
    siteName: "LG Radar Dashboard",
    title: "LG Radar Dashboard",
    description: "Government gazette monitoring and alert system for Western Australia",
  },
  twitter: {
    card: "summary_large_image",
    title: "LG Radar Dashboard",
    description: "Government gazette monitoring and alert system for Western Australia",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
