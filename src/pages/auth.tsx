import { RegisterForm } from '@/components/ui/RegisterForm.tsx'
import React from 'react'
import { useMatch } from 'react-router-dom'
import { LoginForm } from '@/components/ui/LoginForm.tsx'

type Props = {}

const AuthPage = (props: Props) => {
    const math = useMatch('/login')
    const isLogin = Boolean(math)
    return <div className='mt-10'>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
}

export default AuthPage
