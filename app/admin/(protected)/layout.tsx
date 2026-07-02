import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminTokenValue } from '@/lib/auth'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = verifyAdminTokenValue(cookieStore.get('admin_token')?.value)

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
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Wróć do strony
          </Link>
        </aside>

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}