import { CarouselCustomNavigation } from '@/components/CarouselCustomNavigation'
import { Pagination } from '@/components/ui/pagination'
import { CardProduct } from '@/features/product/_components/Card'
import { Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

type Props = {}

const HomePage = (props: Props) => {
    const [products, setProducts] = useState<number[]>([])

    useEffect(() => {
        setProducts([1, 2, 3, 4, 5])
    }, [])

    return (
        <div className=''>
            <div className='w-full h-96 my-8'>
                <CarouselCustomNavigation />
            </div>
            <Typography className='text-3xl font-bold text-center my-10'>List Product</Typography>
            <div className='grid grid-cols-3 gap-6 place-items-start '>
                {products.map(() => (
                    <CardProduct />
                ))}
            </div>
            <div className='mx-auto my-10' style={{ width: '480px' }}>
                <Pagination />
            </div>
        </div>
    )
}

export default HomePage
