import React from 'react'

interface LegalContentProps {
  children: React.ReactNode
}

/**
 * Prose typography container for legal body content.
 * Manual Tailwind arbitrary-variant styles — no @tailwindcss/typography required.
 *
 * Supports: <p>, <ul>, <ol>, <h3>, <strong>, <a>, <table>
 */
export function LegalContent({ children }: LegalContentProps) {
  return (
    <div
      className={[
        // Paragraphs
        '[&>p]:text-[15px] [&>p]:text-gray-600 [&>p]:leading-[1.8] [&>p]:mb-5',
        // Unordered lists
        '[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-5',
        '[&>ul>li]:text-[15px] [&>ul>li]:text-gray-600 [&>ul>li]:leading-[1.8] [&>ul>li]:mb-1.5',
        // Ordered lists
        '[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-5',
        '[&>ol>li]:text-[15px] [&>ol>li]:text-gray-600 [&>ol>li]:leading-[1.8] [&>ol>li]:mb-1.5',
        // Sub-headings
        '[&>h3]:text-[15px] [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mt-7 [&>h3]:mb-3',
        // Inline emphasis
        '[&_strong]:font-semibold [&_strong]:text-gray-800',
        // Links inside content
        '[&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gray-600 [&_a]:transition-colors [&_a]:duration-200',
        // Tables
        '[&>table]:w-full [&>table]:text-sm [&>table]:border-collapse [&>table]:mb-5',
        '[&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:text-gray-700 [&>table>thead>tr>th]:py-2.5 [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-gray-200',
        '[&>table>tbody>tr>td]:py-2.5 [&>table>tbody>tr>td]:text-gray-600 [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-gray-100',
        // Note / blockquote style
        '[&>blockquote]:border-l-2 [&>blockquote]:border-gray-200 [&>blockquote]:pl-4 [&>blockquote]:text-[14px] [&>blockquote]:text-gray-500 [&>blockquote]:italic [&>blockquote]:mb-5',
      ].join(' ')}
    >
      {children}
    </div>
  )
}
