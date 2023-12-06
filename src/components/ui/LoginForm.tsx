import { Button, Card, Checkbox, Input, Typography } from '@material-tailwind/react'
import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { toast } from '@/components/ui/use-toast.ts'
import { loginSchema } from '@/validate/userSchema.ts'
import axios from 'axios'

export type LoginFormType = {
    email: string
    password: string
}
const initialState = {
    email: '',
    password: ''
}

export function LoginForm() {
    const [formState, setFormState] = useState<LoginFormType>(initialState)
    // const navigate = useNavigate()
    const handleChangeInput = (name: keyof LoginFormType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: e.target.value }))
    }
    const navigate = useNavigate()
    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = loginSchema.validate(formState, { abortEarly: false })
        if (error) {
            toast({ variant: 'destructive', title: 'Validate error!!!', description: error?.message.split('.')[0] })
            return
        }
        try {
            const response = await axios.post('http://localhost:3000/login', formState)
            console.log(response)
            if (response.status !== 200) {
                // Xử lý lỗi HTTP
                throw new Error('Tài khoản mật khẩu không chính xác!!!')
            }
            localStorage.setItem('user', JSON.stringify(response.data))
            toast({ variant: 'success', title: 'Login Successful!!!' })
            if (response.data.user.id == 1) {
                navigate('/admin/products')
            } else {
                navigate('/')
            }
        } catch (error) {
            // Xử lý lỗi từ fetch
            // Hiển thị thông báo lỗi
            toast({ variant: 'destructive', title: 'Tài khoản mật khẩu không chính xác!!!!' })
        }
    }
    return (
        <Card color='transparent' shadow={false} className='items-center'>
            <Typography variant='h4' color='blue-gray'>
                Login
            </Typography>
            <form onSubmit={handleSubmitLogin} className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                <div className='mb-1 flex flex-col gap-6'>
                    <Typography variant='h6' color='blue-gray' className='-mb-3'>
                        Your Email
                    </Typography>
                    <Input
                        size='lg'
                        value={formState.email}
                        onChange={handleChangeInput('email')}
                        placeholder='name@mail.com'
                        className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                        labelProps={{
                            className: 'before:content-none after:content-none'
                        }}
                        crossOrigin={undefined}
                    />
                    <Typography variant='h6' color='blue-gray' className='-mb-3'>
                        Password
                    </Typography>
                    <Input
                        type='password'
                        value={formState.password}
                        size='lg'
                        onChange={handleChangeInput('password')}
                        placeholder='********'
                        className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                        labelProps={{
                            className: 'before:content-none after:content-none'
                        }}
                        crossOrigin={undefined}
                    />
                </div>
                <Checkbox
                    label={
                        <Typography variant='small' color='gray' className='flex items-center font-normal'>
                            I agree the
                            <a href='#' className='font-medium transition-colors hover:text-gray-900'>
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: '-ml-2.5' }}
                    crossOrigin={undefined}
                />
                <Button type={'submit'} className='mt-6' fullWidth>
                    Submit
                </Button>
                <Typography color='gray' className='mt-4 text-center font-normal'>
                    You don't have an account?{' '}
                    <NavLink to={'/register'} className='font-medium text-gray-900'>
                        Sign In
                    </NavLink>
                </Typography>
            </form>
        </Card>
    )
}
