import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import FormContact from '@/components/dashboard/contact/FormContact'
import { getContact } from '@/data/contact'
import { getContactFormTexts } from '@/data/home'
import { Suspense } from 'react'

export default async function Page () {
  const contact = await getContact()
  const textformcontact = await getContactFormTexts()

  return <PageList title='Contacto'>
  <Suspense fallback={<div>Loading...</div>}>
    <PageInfo pageID='contact' />
  </Suspense>
  <Suspense fallback={<div>Loading...</div>}>
    <FormContact contact={contact} textFormContact={textformcontact} />
  </Suspense>
</PageList>
}
