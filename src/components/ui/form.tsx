import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react'
import { NavLink, useMatch } from 'react-router-dom'

export function AuthForm() {
    const match = useMatch('login')
    const isLogin = Boolean(match)
    return (
        <Card color='transparent' shadow={false} className='items-center'>
            <Typography variant='h4' color='blue-gray'>
                {isLogin ? 'Login' : 'Sign In'}
            </Typography>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                <div className='mb-1 flex flex-col gap-6'>
                    {!isLogin && (
                        <>
                            <Typography variant='h6' color='blue-gray' className='-mb-3'>
                                Your Name
                            </Typography>
                            <Input
                                size='lg'
                                placeholder='name@mail.com'
                                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                labelProps={{
                                    className: 'before:content-none after:content-none'
                                }}
                                crossOrigin={undefined}
                            />
                        </>
                    )}
                    <Typography variant='h6' color='blue-gray' className='-mb-3'>
                        Your Email
                    </Typography>
                    <Input
                        size='lg'
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
                        size='lg'
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
                <Button className='mt-6' fullWidth>
                    sign up
                </Button>
                {isLogin ? (
                    <Typography color='gray' className='mt-4 text-center font-normal'>
                        You don't have an account?{' '}
                        <NavLink to={'/signin'} className='font-medium text-gray-900'>
                            Sign In
                        </NavLink>
                    </Typography>
                ) : (
                    <Typography color='gray' className='mt-4 text-center font-normal'>
                        Already have an account?{' '}
                        <NavLink to={'/login'} className='font-medium text-gray-900'>
                            Login
                        </NavLink>
                    </Typography>
                )}
            </form>
        </Card>
    )
}
