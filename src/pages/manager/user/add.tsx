import React from 'react'
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react'
import { NavLink, useMatch } from 'react-router-dom'

type Props = {}

const AddProduct = (props: Props) => {
    return (
        <Card color='transparent' className='py-20 items-center' shadow={false}>
            <Typography variant='h4' color='blue-gray'>
                Add Product
            </Typography>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                <div className='mb-1 flex flex-col gap-6'>
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
                <Button className='mt-6' fullWidth>
                    Submit
                </Button>
                <Typography color='gray' className='mt-4 text-center font-normal'>
                    Back to list product page{' '}
                    <NavLink to='/admin/products' className='font-medium text-gray-900'>
                        Product page
                    </NavLink>
                </Typography>
            </form>
        </Card>
    )
}
export default AddProduct
