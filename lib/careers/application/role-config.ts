// ─────────────────────────────────────────────────────────────────────────────
// Career Application - Role-Specific Form Configurations
//
// Each active job role defines its own ordered list of questions.
// The form renderer in ApplicationForm reads these to render the correct fields.
//
// Adding a new role: add a new entry to ROLE_FORM_CONFIGS with the matching slug.
// ─────────────────────────────────────────────────────────────────────────────

export type QuestionType = 'text' | 'radio' | 'select' | 'textarea'

export interface RadioOption {
  value: string
  label: { pl: string; en: string }
}

export interface FormQuestion {
  /** Unique key - maps to roleAnswers[id] in form state */
  id: string
  type: QuestionType
  label: { pl: string; en: string }
  required: boolean
  options?: RadioOption[]               // for radio / select
  placeholder?: { pl: string; en: string }
  rows?: number                         // for textarea
  maxLength?: number                    // for textarea
  /** Radio layout: 'inline' for short 2-3 option groups, 'stack' for options with descriptions */
  radioLayout?: 'inline' | 'stack'
}

export interface RoleFormConfig {
  roleSlug: string
  title: { pl: string; en: string }
  questions: FormQuestion[]
}

// ─── Shared option sets ───────────────────────────────────────────────────────

const YES_NO: RadioOption[] = [
  { value: 'tak', label: { pl: 'Tak', en: 'Yes' } },
  { value: 'nie', label: { pl: 'Nie', en: 'No' } },
]

const EXCEL_LEVELS: RadioOption[] = [
  { value: 'podstawowy', label: { pl: 'Podstawowy (filtry, sortowanie)', en: 'Basic (filters, sorting)' } },
  { value: 'sredniozaawansowany', label: { pl: 'Średniozaawansowany (formuły, tabele przestawne)', en: 'Intermediate (formulas, pivot tables)' } },
  { value: 'zaawansowany', label: { pl: 'Zaawansowany (złożone formuły, analiza danych)', en: 'Advanced (complex formulas, data analysis)' } },
]

const ENGLISH_LEVELS: RadioOption[] = [
  { value: 'podstawowy', label: { pl: 'Podstawowy', en: 'Basic' } },
  { value: 'sredniozaawansowany', label: { pl: 'Średniozaawansowany', en: 'Intermediate' } },
  { value: 'zaawansowany', label: { pl: 'Zaawansowany', en: 'Advanced' } },
  { value: 'biegly', label: { pl: 'Biegły', en: 'Fluent' } },
]

// ─── Shared questions (reused across roles) ───────────────────────────────────

const Q_START_DATE: FormQuestion = {
  id: 'startDate',
  type: 'text',
  label: {
    pl: 'Od kiedy możesz rozpocząć współpracę?',
    en: 'When can you start?',
  },
  required: true,
  placeholder: {
    pl: 'np. od zaraz, od 01.09.2026...',
    en: 'e.g. immediately, from 01 Sep 2026...',
  },
}

const Q_HYBRID: FormQuestion = {
  id: 'hybridAccepted',
  type: 'radio',
  label: {
    pl: 'Czy akceptujesz pracę w modelu hybrydowym 3:2 (3 dni z biura / u Klienta, 2 dni zdalnie)?',
    en: 'Do you accept a 3:2 hybrid model (3 days in office / client site, 2 days remote)?',
  },
  required: true,
  options: YES_NO,
  radioLayout: 'inline',
}

const Q_TRAVEL: FormQuestion = {
  id: 'businessTravel',
  type: 'radio',
  label: {
    pl: 'Czy jesteś otwarty/a na wyjazdy służbowe (na terenie Polski oraz sporadycznie zagraniczne)?',
    en: 'Are you open to business travel (within Poland and occasionally abroad)?',
  },
  required: true,
  options: YES_NO,
  radioLayout: 'inline',
}

const Q_EXCEL: FormQuestion = {
  id: 'excelLevel',
  type: 'radio',
  label: {
    pl: 'Jak oceniasz swój poziom znajomości Excela?',
    en: 'How would you rate your Excel proficiency?',
  },
  required: true,
  options: EXCEL_LEVELS,
  radioLayout: 'stack',
}

const Q_ENGLISH: FormQuestion = {
  id: 'englishLevel',
  type: 'radio',
  label: {
    pl: 'Jak oceniasz swój poziom znajomości języka angielskiego?',
    en: 'How would you rate your English proficiency?',
  },
  required: true,
  options: ENGLISH_LEVELS,
  radioLayout: 'stack',
}

// ─── Role configurations ──────────────────────────────────────────────────────

export const ROLE_FORM_CONFIGS: RoleFormConfig[] = [
  {
    roleSlug: 'procurement-consultant',
    title: { pl: 'Konsultant Zakupowy', en: 'Procurement Consultant' },
    questions: [
      Q_START_DATE,
      Q_HYBRID,
      Q_TRAVEL,
      Q_EXCEL,
      Q_ENGLISH,
      {
        id: 'salaryExpectation',
        type: 'text',
        label: {
          pl: 'Jakie są Twoje oczekiwania finansowe (stawka miesięczna brutto)?',
          en: 'What are your salary expectations (monthly gross)?',
        },
        required: false,
        placeholder: {
          pl: 'np. 8 000 – 10 000 PLN brutto',
          en: 'e.g. 8,000 – 10,000 PLN gross',
        },
      },
      {
        id: 'motivation',
        type: 'textarea',
        label: {
          pl: 'Dlaczego interesuje Cię ta rola i praca w obszarze konsultingu zakupowego?',
          en: 'Why are you interested in this role and working in procurement consulting?',
        },
        required: true,
        placeholder: {
          pl: 'maks. 4–5 zdań',
          en: 'max. 4–5 sentences',
        },
        rows: 5,
        maxLength: 2000,
      },
    ],
  },
  {
    roleSlug: 'junior-business-analyst',
    title: { pl: 'Młodszy Analityk Biznesowy', en: 'Junior Business Analyst' },
    questions: [
      Q_START_DATE,
      {
        id: 'hoursPerWeek',
        type: 'radio',
        label: {
          pl: 'Ile godzin tygodniowo możesz przeznaczyć na pracę (min. 20 h)?',
          en: 'How many hours per week can you dedicate to work (min. 20 h)?',
        },
        required: true,
        options: [
          { value: '20-30h', label: { pl: '20 – 30 h', en: '20 – 30 h' } },
          { value: '30-40h', label: { pl: '30 – 40 h', en: '30 – 40 h' } },
          { value: '40h', label: { pl: '40 h', en: '40 h' } },
        ],
        radioLayout: 'inline',
      },
      Q_HYBRID,
      Q_TRAVEL,
      Q_EXCEL,
      Q_ENGLISH,
      {
        id: 'salaryExpectation',
        type: 'text',
        label: {
          pl: 'Jakie są Twoje oczekiwania finansowe (stawka godzinowa brutto)?',
          en: 'What are your salary expectations (hourly gross rate)?',
        },
        required: false,
        placeholder: {
          pl: 'np. 40 – 60 PLN/h brutto',
          en: 'e.g. 40 – 60 PLN/h gross',
        },
      },
      {
        id: 'motivation',
        type: 'textarea',
        label: {
          pl: 'Dlaczego interesuje Cię ta rola i praca w obszarze analizy / konsultingu zakupowego?',
          en: 'Why are you interested in this role and working in procurement analytics / consulting?',
        },
        required: true,
        placeholder: {
          pl: 'maks. 4–5 zdań',
          en: 'max. 4–5 sentences',
        },
        rows: 5,
        maxLength: 2000,
      },
    ],
  },
]

/**
 * Look up a role's form config by its slug.
 * Returns undefined if the slug is empty or unknown.
 */
export function getRoleConfig(slug: string): RoleFormConfig | undefined {
  if (!slug) return undefined
  return ROLE_FORM_CONFIGS.find((c) => c.roleSlug === slug)
}
