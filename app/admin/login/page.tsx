import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Logowanie' }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-heading font-bold text-brand-primary mb-6">
          Panel administracyjny
        </h1>
        {/* Login form - auth logic added later */}
        <form className="space-y-5" method="POST" action="/api/admin/login">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  )
}
