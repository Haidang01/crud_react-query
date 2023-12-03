import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Tooltip,
    Typography
} from '@material-tailwind/react'
import { NavLink, useLocation } from 'react-router-dom'
import { Product } from '@/common/type.ts'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteProduct, getProducts } from '@/services/product.ts'
import { MdDelete } from 'react-icons/md'
import { toast } from '@/components/ui/use-toast.ts'
import { useState } from 'react'

const LIMIT = 5
const TABS = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Monitored',
        value: 'monitored'
    },
    {
        label: 'Unmonitored',
        value: 'unmonitored'
    }
]

const TABLE_HEAD = ['Product', 'Price', 'Quantity', 'Action']

const ManagerProductPage = () => {
    const queryClient = useQueryClient()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const page = Number(searchParams.get('page')) || 1
    const [products, setProducts] = useState<Product[]>([])
    const { data } = useQuery({
        queryKey: ['products', page],
        queryFn: () => getProducts(Number(page)),
        onSuccess: (data) => {
            setProducts(data?.data)
        }
    })
    const totalRecord = +data?.headers['x-total-count'] || 0
    const totalPage = Math.ceil(totalRecord / LIMIT)

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => {
            return deleteProduct(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'], exact: true }).then((_) => {
                toast({ variant: 'success', title: 'Success!!', description: 'Success delete product' })
            })
        }
    })
    const handlerRemove = (id: number) => {
        const confirm = window.confirm('Are you sure you want to delete this product?')
        if (!confirm) return
        deleteProductMutation.mutate(id)
    }
    return (
        <div className='w-100'>
            <Card className='w-full h-full' style={{ height: '710px' }}>
                <CardHeader floated={false} shadow={false} className='rounded-none'>
                    <div className='mb-8 flex items-center justify-between gap-8'>
                        <div>
                            <Typography variant='h5' color='blue-gray'>
                                Product list
                            </Typography>
                            <Typography color='gray' className='mt-1 font-normal'>
                                See information about all products
                            </Typography>
                        </div>
                        <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
                            <Button variant='outlined' size='sm'>
                                view all
                            </Button>
                            <NavLink to={'/admin/product/add'}>
                                <Button className='flex items-center gap-3' size='sm'>
                                    <UserPlusIcon strokeWidth={2} className='h-4 w-4' /> Add product
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className='h-full px-0'>
                    <table className='mt-4 w-full min-w-max table-auto text-left'>
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                                    >
                                        <Typography
                                            variant='small'
                                            color='blue-gray'
                                            className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                                        >
                                            {head}{' '}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className='h-4 w-4' />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item: Product, index: number) => {
                                const isLast = index === products.length - 1
                                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                                return (
                                    <tr key={item.name}>
                                        <td className={classes}>
                                            <div className='flex items-center gap-3'>
                                                <Avatar src={item.image} alt={item.name} size='sm' />
                                                <div className='flex flex-col'>
                                                    <Typography
                                                        variant='small'
                                                        color='blue-gray'
                                                        className='font-normal'
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className='flex flex-col'>
                                                <Typography variant='small' color='blue-gray' className='font-normal'>
                                                    {item.quantity}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant='small'
                                                color='blue-gray'
                                                className='font-normal opacity-70'
                                            >
                                                {item.price}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content='Edit User'>
                                                <NavLink to={'/admin/product/edit/' + item.id}>
                                                    <IconButton variant='text'>
                                                        <PencilIcon className='h-4 w-4' />
                                                    </IconButton>
                                                </NavLink>
                                            </Tooltip>
                                            <Tooltip content='Delete User'>
                                                <IconButton onClick={() => handlerRemove(item.id)} variant='text'>
                                                    <MdDelete className='h-4 w-4' />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
                    <Button variant={'outlined'} disabled={page === 1} size='sm'>
                        <NavLink to={`/admin/products?page=${+page - 1}`}>Previous</NavLink>
                    </Button>
                    <div className='flex items-center gap-2'>
                        {Array(totalPage)
                            .fill(0)
                            .map((_, index) => (
                                <NavLink to={`/admin/products?page=${index + 1}`}>
                                    <IconButton
                                        key={index + 1}
                                        variant={page && index + 1 === +page ? 'outlined' : 'text'}
                                        size='sm'
                                    >
                                        {index + 1}
                                    </IconButton>
                                </NavLink>
                            ))}
                    </div>
                    <Button variant={'outlined'} disabled={page === totalPage} size='sm'>
                        <NavLink to={`/admin/products?page=${+page + 1}`}>Next</NavLink>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ManagerProductPage
