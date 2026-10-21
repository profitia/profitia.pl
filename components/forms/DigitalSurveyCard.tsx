'use client'

import { useState } from 'react'

import { DigitalSurveyForm } from '@/components/forms/DigitalSurveyForm'

export function DigitalSurveyCard() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="rounded-[28px] border border-[rgb(226,232,240)] bg-white p-6 shadow-[0_24px_70px_rgba(36,47,68,0.10)] sm:p-8 lg:p-9">
      {!submitted && (
        <>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,109,158)]">
            Zgłoś udział w badaniu
          </p>
          <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.035em] text-[rgb(36,47,68)]">
            Zostaw dane kontaktowe
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-[rgb(72,94,136)]">
            Odezwiemy się z krótkim kwestionariuszem dopasowanym do Twojej organizacji.
          </p>
        </>
      )}
      <div className={submitted ? '' : 'mt-7'}>
        <DigitalSurveyForm onSuccess={() => setSubmitted(true)} />
      </div>
    </div>
  )
}
