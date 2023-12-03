import { AuthForm } from '@/components/ui/form'
import Signup from '@/features/auth/_components/Signup'
import React from 'react'

type Props = {}

const AuthPage = (props: Props) => {
    return (
        <div className='mt-10'>
            <AuthForm />
        </div>
    )
}

export default AuthPage
