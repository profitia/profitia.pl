'use client'

import ServicesContainer from './ServicesContainer'

type TrainingItem = {
  id: string
  title: string
  description: string
  brochureHref?: string
}

type DomainItem = {
  id: string
  title: string
  trainings: TrainingItem[]
}

interface Props {
  domains: DomainItem[]
}

export default function EducationCatalogAccordion({ domains }: Props) {
  return (
    <ServicesContainer
      domains={domains.map((domain) => ({
        id: domain.id,
        title: domain.title,
        products: domain.trainings.map((training) => ({
          id: training.id,
          title: training.title,
          description: [training.description],
          action: training.brochureHref
            ? { label: 'Pobierz broszurę', href: training.brochureHref, download: true }
            : undefined,
        })),
      }))}
    />
  )
}