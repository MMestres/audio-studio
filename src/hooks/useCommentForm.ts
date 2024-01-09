import { saveCommentFromPublic } from '@/data/comments'
import { useEffect, useState } from 'react'

export const useCommentForm = (onSubmitForm: () => void) => {
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
    const messageI = e.currentTarget.message as unknown as HTMLTextAreaElement

    saveCommentFromPublic(nameI.value, messageI.value).then(() => {
      setLoading(false)
      setSuccess(true)

      nameI.value = ''
      messageI.value = ''

      setTimeout(() => {
        setSuccess(false)
        onSubmitForm()
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
