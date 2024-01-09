'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { saveContact } from '@/data/contact'
import { saveHomeProps } from '@/data/home'
import { type ContactData } from '@/types/ContactData'
import { type ContactFormText } from '@/types/ContactFormText'

interface FormContactProps {
  contact?: ContactData
  textFormContact?: ContactFormText
}

export default function FormContact ({
  contact, textFormContact
}: FormContactProps) {
  const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    const addressI = e.currentTarget.address as unknown as HTMLInputElement
    const phoneI = e.currentTarget.phone as unknown as HTMLInputElement
    const mailI = e.currentTarget.mail as unknown as HTMLInputElement
    const mapI = e.currentTarget.map as unknown as HTMLInputElement
    return await saveContact(contact?.id, addressI.value, phoneI.value, mailI.value, mapI.value)
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const contactInputNameI = e.currentTarget.contactInputName as unknown as HTMLInputElement
    const contactInputEmailI = e.currentTarget.contactInputEmail as unknown as HTMLInputElement
    const contactInputMessageI = e.currentTarget.contactInputMessage as unknown as HTMLInputElement
    const contactInputSubmitI = e.currentTarget.contactInputSubmit as unknown as HTMLInputElement
    return await saveHomeProps({
      contactInputName: contactInputNameI.value,
      contactInputEmail: contactInputEmailI.value,
      contactInputMessage: contactInputMessageI.value,
      contactInputSubmit: contactInputSubmitI.value
    })
  }

  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Form title='Datos de contacto' submit={handleSubmitData}>
      <Input name='address' label='Dirección' value={contact?.address} />
      <Input name='phone' label='Teléfono' value={contact?.phone} />
      <Input name='mail' label='Correo electrónico' value={contact?.mail} />
      <Input name='map' label='Coordenadas o texto de búsqueda en google maps' value={contact?.map} />
    </Form>
    <Form title='Formulario de contacto' submit={handleSubmitForm}>
      <Input name='contactInputName' label='Campo de nombre' value={textFormContact?.contactInputName} />
      <Input name='contactInputEmail' label='Campo de email' value={textFormContact?.contactInputEmail} />
      <Input name='contactInputMessage' label='Campo de mensaje' value={textFormContact?.contactInputMessage} />
      <Input name='contactInputSubmit' label='Botón de envio' value={textFormContact?.contactInputSubmit} />
    </Form>
  </div>
}
