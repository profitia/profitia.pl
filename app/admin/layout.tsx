import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    template: '%s | Admin - Profitia',
    default: 'Admin Panel',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-gray-100 min-h-screen font-sans antialiased">
        <div className="flex h-screen">
          {/* Sidebar — placeholder */}
          <aside className="w-64 bg-brand-primary text-white flex flex-col p-6 hidden md:flex">
            <div className="text-xl font-bold mb-10">Profitia Admin</div>
            <nav className="space-y-2 flex-1">
              <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-brand-secondary transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/articles" className="block px-4 py-2 rounded hover:bg-brand-secondary transition-colors">
                Artykuły
              </Link>
            </nav>
            <Link href="/" className="text-sm text-blue-200 hover:text-white">
              ← Wróć do strony
            </Link>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
