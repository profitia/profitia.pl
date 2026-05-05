import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboardPage() {
  const [articleCount, contactCount, subscriberCount] = await Promise.all([
    prisma.article.count(),
    prisma.contact.count(),
    prisma.subscriber.count(),
  ])

  const stats = [
    { label: 'Artykuły', value: articleCount },
    { label: 'Zgłoszenia kontaktowe', value: contactCount },
    { label: 'Subskrybenci', value: subscriberCount },
  ]

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-4xl font-bold text-brand-primary">{stat.value}</div>
            <div className="text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
