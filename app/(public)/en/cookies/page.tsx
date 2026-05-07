import type { Metadata } from 'next'
import {
  LegalLayout,
  LegalHero,
  LegalSection,
  LegalContent,
} from '@/components/legal'
import type { TOCItem } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Cookie Policy | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/en/cookies',
    languages: {
      pl: 'https://www.profitia.pl/cookies',
      en: 'https://www.profitia.pl/en/cookies',
    },
  },
}

const TOC: TOCItem[] = [
  { id: 'what-are',       label: '1. What are cookies' },
  { id: 'types',          label: '2. Types of cookies' },
  { id: 'own-cookies',    label: '3. First-party cookies' },
  { id: 'third-party',    label: '4. Third-party cookies' },
  { id: 'managing',       label: '5. Managing cookies' },
  { id: 'changes',        label: '6. Policy changes' },
]

export default function CookiesPageEN() {
  return (
    <LegalLayout toc={TOC}>
      <LegalHero
        eyebrow="Legal Document"
        title="Cookie Policy"
        intro="Information about how profitia.pl uses cookies and how you can manage your preferences."
        meta={[
          { label: 'Last updated', value: 'May 2026' },
          { label: 'Version', value: '1.0' },
        ]}
      />

      <LegalSection id="what-are" title="1. What are cookies">
        <LegalContent>
          <p>
            Cookies are small text files stored on your device by your web browser when you visit websites. They allow websites to remember information about your session, preferences and behaviour.
          </p>
          <p>
            Cookies are not used to identify the personal identity of users without their consent.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="types" title="2. Types of cookies">
        <LegalContent>
          <ul>
            <li><strong>Essential cookies</strong> — required for the website to function correctly; no consent needed.</li>
            <li><strong>Functional cookies</strong> — remember user preferences such as language selection.</li>
            <li><strong>Analytics cookies</strong> — help us understand site traffic and user behaviour.</li>
            <li><strong>Marketing cookies</strong> — may be used to deliver personalised content and ads.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="own-cookies" title="3. First-party cookies">
        <LegalContent>
          <ul>
            <li><strong>PROFITIA_LOCALE</strong> — stores the selected interface language (PL/EN). Expires: 12 months.</li>
            <li>Session handling for contact forms.</li>
            <li>Security tokens (CSRF protection).</li>
          </ul>
          <p>These cookies are essential and do not require separate consent.</p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="third-party" title="4. Third-party cookies">
        <LegalContent>
          <p>We may use third-party services that place their own cookies, including analytics platforms and social media integrations. Their data practices are governed by their own privacy and cookie policies.</p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="managing" title="5. Managing cookies">
        <LegalContent>
          <p>You can manage or delete cookies at any time via your browser settings. Most browsers allow you to:</p>
          <ul>
            <li>View and delete stored cookies.</li>
            <li>Block cookies from specific sites.</li>
            <li>Block all third-party cookies.</li>
            <li>Delete all cookies when the browser closes.</li>
          </ul>
          <p>Restricting cookies may affect the functionality of the website.</p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="changes" title="6. Policy changes">
        <LegalContent>
          <p>
            We reserve the right to update this cookie policy. The current version is always available at profitia.pl/en/cookies. Continued use of the website after changes constitutes acceptance.
          </p>
        </LegalContent>
      </LegalSection>
    </LegalLayout>
  )
}
