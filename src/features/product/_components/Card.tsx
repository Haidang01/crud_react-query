import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { Product } from '@/common/type.ts'
import { NavLink } from 'react-router-dom'

type CardProps = {
    product: Product
    key: number
}

export function CardProduct({ product, key }: CardProps) {
    return (
        <Card className='mt-6 w-96' key={key}>
            <CardHeader color='blue-gray' className='relative h-56'>
                <img src={product.image} alt='card-image' />
            </CardHeader>
            <CardBody>
                <Typography variant='h5' color='blue-gray' className='mb-2'>
                    {product.name}
                </Typography>
                <Typography>{product.price}</Typography>
            </CardBody>
            <NavLink to={'/product/' + product.id}>
                <CardFooter className='pt-0'>
                    <Button>Read More</Button>
                </CardFooter>
            </NavLink>
        </Card>
    )
}
