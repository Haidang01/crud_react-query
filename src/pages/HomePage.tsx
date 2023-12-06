import { CarouselCustomNavigation } from '@/components/CarouselCustomNavigation'
import { Pagination } from '@/components/ui/pagination'
import { CardProduct } from '@/features/product/_components/Card'
import { Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getProducts } from '@/services/product.ts'
import { useLocation } from 'react-router-dom'
import { Product } from '@/common/type.ts'

type Props = {}

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([])

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const page = Number(searchParams.get('page')) || 1

    const { data } = useQuery({
        queryKey: ['products', page],
        queryFn: () => getProducts(page),
        onSuccess: (data) => {
            setProducts(data?.data)
        }
    })
    const totalRecord = +data?.headers['x-total-count'] || 0
    const totalPage = Math.ceil(totalRecord / 5)
    return (
        <div className=''>
            <div className='w-full h-96 my-8'>
                <CarouselCustomNavigation />
            </div>
            <Typography className='text-3xl font-bold text-center my-10'>List Product</Typography>
            <div className='grid grid-cols-3 gap-6 place-items-start '>
                {products.map((product: Product) => {
                    return <CardProduct key={product.id} product={product} />
                })}
            </div>
            <div className='mx-auto my-10' style={{ width: '480px' }}>
                <Pagination page={page} totalPage={totalPage} />
            </div>
        </div>
    )
}

export default HomePage
