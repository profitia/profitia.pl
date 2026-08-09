import type { Metadata } from 'next'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

export const metadata: Metadata = { title: 'Logowanie' }

export default function AdminLoginPage() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-heading font-bold text-brand-primary mb-6">
          Panel administracyjny
        </h1>
        <AdminLoginForm siteKey={siteKey} />
      </div>
    </div>
  )
}
