import Address from '@/components/contact/Address'
import ContactForm from '@/components/contact/ContactForm'
import { getContact } from '@/data/contact'
import { getContactFormTexts } from '@/data/home'
import { getPageInfo } from '@/data/pages'

export default async function ContactSection () {
  const pageInfo = await getPageInfo('contact')
  const contact = await getContact()
  const contactFormTexts = await getContactFormTexts()

  return (
    <>
      <div className="lg:absolute lg:inset-8 lg:bottom-auto lg:left-[50%] flex flex-col lg:flex-row-reverse gap-2">
        <Address {...contact} />
        <div className="lg:bg-black/90 lg:rounded-md lg:p-6 lg:z-10 flex flex-col gap-2 mx-auto lg:mx-0 max-w-[350px] mt-10 lg:mt-0">
          <h2 className="text-xl font-bold text-white">{pageInfo?.title}</h2>
          <p className="text-md text-zinc-200 mb-6">{pageInfo?.subtitle}</p>
          <ContactForm txtName={contactFormTexts?.contactInputName ?? ''} txtEmail={contactFormTexts?.contactInputEmail ?? ''} txtMessage={contactFormTexts?.contactInputMessage ?? ''} txtSubmit={contactFormTexts?.contactInputSubmit ?? ''} />
        </div>
      </div>
      {(contact.map != null && contact.map !== '') && <div className="relative lg:h-[100%] rounded-lg shadow-lg dark:shadow-black/20">
        <iframe src={`https://maps.google.com/maps?q=${contact.map}&z=14&output=embed`}
          className="lg:absolute lg:left-0 lg:top-0 h-full w-full rounded-md map pb-4 lg:pb-0"></iframe>
      </div>}
    </>
  )
}
