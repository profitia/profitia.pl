import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JOB_POSTS } from '../lib/careers/data'
import { getAllJobs } from '../lib/careers/utils'
import { JOB_POSITION_BY_ROLE_SLUG, JOB_POSITION_LABELS } from '../lib/recruitment/contract'
import { RecruitmentTransportSchema } from '../lib/recruitment/contract'
import { normalizeJobApplicationInput } from '../lib/recruitment/job-application'

const root = resolve(import.meta.dirname, '..')
const listing = readFileSync(resolve(root, 'components/pages/CareerListingPage.tsx'), 'utf8')
const roleCard = readFileSync(resolve(root, 'components/careers/CareerRoleCard.tsx'), 'utf8')
const roleDetail = readFileSync(resolve(root, 'components/careers/CareerJobDetail.tsx'), 'utf8')
const life = readFileSync(resolve(root, 'components/careers/CareerLife.tsx'), 'utf8')
const recruiter = readFileSync(resolve(root, 'components/careers/CareerRecruiter.tsx'), 'utf8')

assert.deepEqual(getAllJobs().map((job) => job.title.pl), [
  'Junior Analyst / Analyst',
  'Consultant / Senior Consultant',
  'Manager',
])
assert.equal(JOB_POSTS.length, 3)
assert.equal(JOB_POSITION_BY_ROLE_SLUG.manager, 'MANAGER')
assert.equal(JOB_POSITION_LABELS.MANAGER.pl, 'Manager')

const managerInput = RecruitmentTransportSchema.parse({
  roleSlug: 'manager',
  fullName: 'Test Manager',
  email: 'manager@example.com',
  phone: '+48 500 600 700',
  availableFrom: 'od zaraz',
  hybridAccepted: 'tak',
  businessTravel: 'tak',
  excelLevel: 'zaawansowany',
  englishLevel: 'biegly',
  motivation: 'Chcę prowadzić projekty doradcze w Profitia.',
  consentCurrent: true,
  consentFuture: false,
  locale: 'pl',
  sourcePage: '/kariera/aplikuj',
})
assert.equal(normalizeJobApplicationInput(managerInput).position, 'MANAGER')

assert.match(listing, /Co zyskujemy, pracując w Profitia/)
assert.match(listing, /Rozwijamy marki osobiste/)
assert.doesNotMatch(listing, /Dane na poziomie organizacji/)
assert.match(listing, /CareerLife/)
assert.match(listing, /CareerRecruiter/)

assert.doesNotMatch(roleCard, /tCareer\(job\.employmentType/)
assert.doesNotMatch(roleDetail, /tCareer\(job\.employmentType/)
assert.match(life, /Profitia_30\.jpg/)
assert.match(life, /GALLERY_IMAGE_COUNT = 13/)
assert.match(life, /hiddenImageCount/)
assert.match(life, /\+\{hiddenImageCount\}/)
assert.match(life, /ArrowLeft/)
assert.match(life, /ArrowRight/)
assert.match(life, /aria-modal="true"/)
assert.match(life, /role="dialog"/)
assert.match(recruiter, /monika-osiecka/)
assert.match(recruiter, /kariera@profitia\.pl/)
assert.match(recruiter, /LinkedIn - \$\{monika\.name\}/)

console.log('Career page content regression tests passed.')
