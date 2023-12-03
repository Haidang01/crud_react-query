import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Product } from '@/common/type.ts'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { addProduct } from '@/services/product.ts'
import { toast } from '@/components/ui/use-toast.ts'

type FormStateType = Omit<Product, 'id'>
const initialFormState: FormStateType = {
    name: '',
    image: '',
    quantity: 0,
    description: '',
    price: 0
}
const AddProduct = () => {
    const [formState, setFormState] = useState<FormStateType>(initialFormState)
    const onChangeInput = (name: keyof FormStateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [name]: e.target.value
        })
    }
    const onReset = () => {
        setFormState(initialFormState)
    }
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: (body: FormStateType) => {
            return addProduct(body)
        },
        onSuccess: () => {
            navigate('/admin/products')
            toast({
                variant: 'success',
                title: 'Success!!',
                description: 'Thêm sản phẩm thành công'
            })
            onReset()
        }
    })
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(formState)
    }
    return (
        <Card color='transparent' className='py-20 items-center' shadow={false}>
            <Typography variant='h4' color='blue-gray'>
                Add Product
            </Typography>
            <form onSubmit={onSubmit} className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                <div className='mb-1 flex flex-col gap-3'>
                    <div className='flex flex-col gap-3 '>
                        <Typography variant='h6' color='blue-gray' className='-mb-3'>
                            ProductName
                        </Typography>
                        <Input
                            size='lg'
                            placeholder='Name'
                            onChange={onChangeInput('name')}
                            value={formState.name}
                            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                            labelProps={{
                                className: 'before:content-none after:content-none'
                            }}
                            crossOrigin={undefined}
                        />
                    </div>
                    <div className='my-4 flex items-center gap-4'>
                        <div>
                            <Typography variant='h6' color='blue-gray'>
                                Quantity
                            </Typography>
                            <Input
                                type='number'
                                containerProps={{ className: 'min-w-[72px]' }}
                                placeholder='Quantity'
                                value={formState.quantity}
                                onChange={onChangeInput('quantity')}
                                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                labelProps={{
                                    className: 'before:content-none after:content-none'
                                }}
                                crossOrigin={undefined}
                            />
                        </div>
                        <div>
                            <Typography variant='h6' color='blue-gray'>
                                Price
                            </Typography>
                            <Input
                                type='number'
                                maxLength={4}
                                value={formState.price}
                                containerProps={{ className: 'min-w-[72px]' }}
                                placeholder='Price'
                                onChange={onChangeInput('price')}
                                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                labelProps={{
                                    className: 'before:content-none after:content-none'
                                }}
                                crossOrigin={undefined}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Typography variant='h6' color='blue-gray' className='-mb-3'>
                            Description
                        </Typography>
                        <Input
                            size='lg'
                            placeholder='description'
                            onChange={onChangeInput('description')}
                            value={formState.description}
                            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                            labelProps={{
                                className: 'before:content-none after:content-none'
                            }}
                            crossOrigin={undefined}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Typography variant='h6' color='blue-gray' className='-mb-3'>
                            Image
                        </Typography>
                        <Input
                            type='text'
                            size='lg'
                            placeholder='Image'
                            onChange={onChangeInput('image')}
                            value={formState.image}
                            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                            labelProps={{
                                className: 'before:content-none after:content-none'
                            }}
                            crossOrigin={undefined}
                        />
                    </div>
                </div>
                <Button className='mt-6' type={'submit'} fullWidth>
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
