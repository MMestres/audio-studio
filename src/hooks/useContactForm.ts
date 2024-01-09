import { createContactMessage } from '@/data/contactmessage'
import { useEffect, useState } from 'react'

export const useContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [classForm, setClassForm] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    setError(false)
    setSuccess(false)
    e.preventDefault()

    const nameI = e.currentTarget.name as unknown as HTMLInputElement
    const emailI = e.currentTarget.email as unknown as HTMLInputElement
    const messageI = e.currentTarget.message as unknown as HTMLTextAreaElement

    createContactMessage(nameI.value, emailI.value, messageI.value).then(() => {
      setLoading(false)
      setSuccess(true)

      nameI.value = ''
      emailI.value = ''
      messageI.value = ''

      setTimeout(() => {
        setSuccess(false)
      }, 500)
    }).catch((err) => {
      setLoading(false)
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 500)
      console.error(err)
    })
  }

  useEffect(() => {
    if (error) {
      setClassForm('animatecss animatecss-shake')
    } else if (success) {
      setClassForm('animatecss animatecss-pulse animatecss-fast')
    } else {
      setClassForm('')
    }
  }, [error, success])

  return {
    onSubmit,
    className: {
      form: classForm
    },
    loading
  }
}
