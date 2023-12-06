import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getProduct } from '@/services/product.ts'
import { Typography } from '@material-tailwind/react'

const ProductDetailPage = () => {
    const { id } = useParams()

    const { data } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(Number(id)),
        enabled: id !== undefined
    })
    return (
        <div className='grid gap-4 grid-cols-2 py-10'>
            <div>
                <img
                    className='h-96 w-full rounded-lg object-cover object-center'
                    src={data?.image}
                    alt='nature image'
                />
            </div>
            <div>
                <Typography variant={'h2'} className={'text-blue-900'}>
                    {data?.name}
                </Typography>
                <Typography variant={'h5'} className={'text-brown-800'}>
                    Description: {data?.description}
                </Typography>
                <Typography variant={'h5'} className={'text-brown-800'}>
                    Price : {data?.price}
                </Typography>
            </div>
        </div>
    )
}

export default ProductDetailPage
