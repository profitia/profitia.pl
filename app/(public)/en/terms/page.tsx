import type { Metadata } from 'next'
import {
  LegalLayout,
  LegalHero,
  LegalSection,
  LegalContent,
} from '@/components/legal'
import type { TOCItem } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Terms of Service | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/en/terms',
    languages: {
      pl: 'https://www.profitia.pl/terms',
      en: 'https://www.profitia.pl/en/terms',
    },
  },
}

const TOC: TOCItem[] = [
  { id: 'definitions',    label: '1. Definitions' },
  { id: 'scope',          label: '2. Scope of services' },
  { id: 'conditions',     label: '3. Terms of use' },
  { id: 'liability',      label: '4. Liability' },
  { id: 'ip',             label: '5. Intellectual property' },
  { id: 'final',          label: '6. Final provisions' },
]

export default function TermsPageEN() {
  return (
    <LegalLayout toc={TOC}>
      <LegalHero
        eyebrow="Legal Document"
        title="Terms of Service"
        intro="Terms governing the use of the profitia.pl website operated by Profitia Management Consultants Mazurowski i Wspólnicy Sp. J."
        meta={[
          { label: 'Last updated', value: 'May 2026' },
          { label: 'Version', value: '1.0' },
          { label: 'Jurisdiction', value: 'Poland' },
        ]}
      />

      <LegalSection id="definitions" title="1. Definitions">
        <LegalContent>
          <ul>
            <li><strong>Website</strong> — the website accessible at profitia.pl.</li>
            <li><strong>Administrator</strong> — Profitia Management Consultants Mazurowski i Wspólnicy Sp. J., ul. Puławska 145, 02-715 Warsaw.</li>
            <li><strong>User</strong> — any individual using the Website.</li>
            <li><strong>Content</strong> — all materials published on the Website, including articles, reports and graphics.</li>
            <li><strong>Services</strong> — advisory, training and analytical services provided by the Administrator.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="scope" title="2. Scope of Services">
        <LegalContent>
          <p>profitia.pl is an informational and marketing website presenting the Administrator&apos;s offering in:</p>
          <ul>
            <li>Procurement and negotiation consulting.</li>
            <li>CIPS training and certification programmes.</li>
            <li>SpendGuru analytics solution.</li>
            <li>Industry reports and publications.</li>
          </ul>
          <p>Detailed terms for individual services are governed by separate agreements with clients.</p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="conditions" title="3. Terms of Use">
        <LegalContent>
          <p>Use of the Website is free of charge and does not require registration, except for features requiring login.</p>
          <p>Users agree to:</p>
          <ul>
            <li>Use the Website in accordance with applicable law and good practice.</li>
            <li>Not take actions that could disrupt the Website&apos;s operation.</li>
            <li>Not copy or distribute Website content without authorisation.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="liability" title="4. Liability">
        <LegalContent>
          <ul>
            <li>Content is provided for informational purposes only and does not constitute legal or financial advice.</li>
            <li>The Administrator is not liable for decisions made on the basis of Website content.</li>
            <li>The Administrator is not liable for interruptions caused by factors beyond its control.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="ip" title="5. Intellectual Property">
        <LegalContent>
          <p>
            All content on the Website, including texts, graphics, logos, data and reports, is the property of the Administrator or its licensors. Copying, modifying or distributing content without prior written consent is prohibited, except as permitted by copyright law.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="final" title="6. Final Provisions">
        <LegalContent>
          <p>These Terms take effect upon publication on the Website.</p>
          <p>
            Polish law governs these Terms. Any disputes shall be resolved by the court with jurisdiction over the Administrator&apos;s registered seat.
          </p>
        </LegalContent>
      </LegalSection>
    </LegalLayout>
  )
}
