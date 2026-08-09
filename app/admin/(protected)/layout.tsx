import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { ADMIN_SESSION_COOKIE, verifyActiveAdminTokenValue } from '@/lib/auth'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = await verifyActiveAdminTokenValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 p-6 text-white md:flex md:flex-col" style={{ backgroundColor: '#242F44' }}>
          <div className="text-xl font-bold mb-10">Profitia Admin</div>
          <nav className="space-y-2 flex-1">
            <Link href="/admin/dashboard" className="block px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/articles" className="block px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors">
              Artykuły
            </Link>
          </nav>
          <div className="space-y-4">
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <LogOut aria-hidden="true" size={16} />
                Wyloguj się
              </button>
            </form>
            <Link href="/" className="block text-sm text-gray-400 hover:text-white transition-colors">
              ← Wróć do strony
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}