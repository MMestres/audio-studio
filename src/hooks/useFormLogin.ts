import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRef, useState, type FormEventHandler, type ChangeEvent } from 'react'

export const useFormLogin = () => {
  const refBtnLogin = useRef<HTMLButtonElement>(null)
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    setLoading(true)
    e.preventDefault()

    signIn('credentials', {
      ...userInfo,
      redirect: false
    }).then(res => {
      if (res?.error != null) {
        failLogin()
        setLoading(false)
      } else {
        router.push('/dashboard')
      }
    }).catch(() => {
      failLogin()
      setLoading(false)
    })
  }

  const failLogin = () => {
    setError(true)

    setTimeout(() => {
      setError(false)
    }, 500)
  }

  const changeUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, username: e.target.value })
  }

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, password: e.target.value })
  }

  return {
    refBtnLogin,
    changeUser,
    changePassword,
    handleSubmit,
    loading,
    error,
    userInfo
  }
}
