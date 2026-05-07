import type { Metadata } from 'next'
import {
  LegalLayout,
  LegalHero,
  LegalSection,
  LegalContent,
} from '@/components/legal'
import type { TOCItem } from '@/components/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy | Profitia',
  alternates: {
    canonical: 'https://www.profitia.pl/en/privacy',
    languages: {
      pl: 'https://www.profitia.pl/privacy',
      en: 'https://www.profitia.pl/en/privacy',
    },
  },
}

const TOC: TOCItem[] = [
  { id: 'controller',   label: '1. Data Controller' },
  { id: 'legal-basis',  label: '2. Legal Basis' },
  { id: 'categories',   label: '3. Data Categories' },
  { id: 'purposes',     label: '4. Purposes of Processing' },
  { id: 'retention',    label: '5. Retention Period' },
  { id: 'rights',       label: '6. Your Rights' },
  { id: 'transfers',    label: '7. International Transfers' },
  { id: 'contact',      label: '8. Contact' },
]

export default function PrivacyPageEN() {
  return (
    <LegalLayout toc={TOC}>
      <LegalHero
        eyebrow="Legal Document"
        title="Privacy Policy"
        intro="This privacy policy describes how Profitia Management Consultants collects, uses and protects personal data of users of profitia.pl."
        meta={[
          { label: 'Last updated', value: 'May 2026' },
          { label: 'Version', value: '1.0' },
          { label: 'Jurisdiction', value: 'Poland / EU' },
        ]}
      />

      <LegalSection id="controller" title="1. Data Controller">
        <LegalContent>
          <p>
            The data controller within the meaning of the General Data Protection Regulation (EU) 2016/679 (GDPR) is <strong>Profitia Management Consultants Mazurowski i Wspólnicy Sp. J.</strong>, registered at ul. Puławska 145 (Villa Metro, 5th floor), 02-715 Warsaw, Poland.
          </p>
          <p>
            For any matters related to the processing of personal data, please contact us at: kontakt@profitia.pl or by post to the registered address.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="legal-basis" title="2. Legal Basis for Processing">
        <LegalContent>
          <p>We process personal data on the following legal bases under Article 6 of the GDPR:</p>
          <ul>
            <li><strong>Art. 6(1)(a)</strong> — consent of the data subject (e.g. newsletter subscription, contact forms).</li>
            <li><strong>Art. 6(1)(b)</strong> — performance of a contract or pre-contractual measures.</li>
            <li><strong>Art. 6(1)(c)</strong> — compliance with a legal obligation.</li>
            <li><strong>Art. 6(1)(f)</strong> — legitimate interests of the controller (e.g. direct marketing, site security).</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="categories" title="3. Categories of Personal Data">
        <LegalContent>
          <p>Depending on the purpose of interaction, we may process the following categories of data:</p>
          <ul>
            <li>Identification data — name, job title, company.</li>
            <li>Contact data — email address, phone number.</li>
            <li>Technical data — IP address, cookies, server logs.</li>
            <li>Correspondence data — content of messages submitted through forms.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="purposes" title="4. Purposes of Processing">
        <LegalContent>
          <ul>
            <li>Handling enquiries and correspondence — based on legitimate interest or contract.</li>
            <li>Delivering advisory and training services — based on contract.</li>
            <li>Sending newsletters and marketing communications — based on consent.</li>
            <li>Website analytics and optimisation — based on legitimate interest.</li>
            <li>Fulfilling accounting and tax obligations — based on legal requirement.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="retention" title="5. Retention Period">
        <LegalContent>
          <ul>
            <li>Contact form data — up to 3 years from last contact.</li>
            <li>Contract-related data — as required by tax and accounting law (typically 5 years).</li>
            <li>Newsletter subscription data — until consent is withdrawn.</li>
          </ul>
        </LegalContent>
      </LegalSection>

      <LegalSection id="rights" title="6. Your Rights">
        <LegalContent>
          <p>Under the GDPR you have the right to:</p>
          <ul>
            <li><strong>Access</strong> your personal data and information about processing.</li>
            <li><strong>Rectification</strong> of inaccurate or incomplete data.</li>
            <li><strong>Erasure</strong> (&quot;right to be forgotten&quot;).</li>
            <li><strong>Restriction</strong> of processing in cases defined by Art. 18 GDPR.</li>
            <li><strong>Data portability</strong> where processing is based on consent or contract.</li>
            <li><strong>Object</strong> to processing based on legitimate interest.</li>
            <li><strong>Withdraw consent</strong> at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p>
            You also have the right to lodge a complaint with the Polish supervisory authority: Urząd Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warsaw.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="transfers" title="7. International Transfers">
        <LegalContent>
          <p>
            Personal data is not as a rule transferred outside the European Economic Area. Where third-party tools are used whose providers may process data outside the EEA (e.g. cloud services), we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection id="contact" title="8. Contact">
        <LegalContent>
          <ul>
            <li>Email: kontakt@profitia.pl</li>
            <li>Address: ul. Puławska 145, Villa Metro 5th fl., 02-715 Warsaw, Poland</li>
            <li>Phone: +48 533 747 340</li>
          </ul>
          <p>This privacy policy may be updated. The current version is always available at profitia.pl/en/privacy.</p>
        </LegalContent>
      </LegalSection>
    </LegalLayout>
  )
}
