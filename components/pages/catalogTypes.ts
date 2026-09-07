export type CatalogProductAction = {
  label: string
  href: string
  download?: boolean
}

export type CatalogContentGroup = {
  title?: string
  paragraphs?: string[]
  items?: string[]
  ordered?: boolean
}

export type CatalogContentSection = {
  title?: string
  paragraphs?: string[]
  items?: string[]
  ordered?: boolean
  groups?: CatalogContentGroup[]
}

export type CatalogProduct = {
  id: string
  title: string
  description?: string[]
  sections?: CatalogContentSection[]
  action?: CatalogProductAction
}

export type CatalogDomain = {
  id: string
  title: string
  products: CatalogProduct[]
}