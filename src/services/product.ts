import instance from '../core/api'
import { Product } from '@/common/type.ts'

export const getProducts = async (page: number = 1, limit: number = 6) => {
    try {
        return await instance.get(`/products`, {
            params: {
                _page: page,
                _limit: limit
            }
        })
    } catch (error) {
        console.log(`['FETCH_PRODUCTS_ERROR']`, error)
    }
}
export const getProduct = async (id: number) => {
    try {
        const response = await instance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log(`['FETCH_PRODUCT_ERROR']`, error)
    }
}
export const updateProduct = async (product: Product) => {
    try {
        const response = await instance.patch(`/products/${product.id}`, product)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_PRODUCT_ERROR']`, error)
    }
}
export const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
        const response = await instance.post('/products', product)
        return response.data
    } catch (error) {
        console.log(`['ADD_PRODUCT_ERROR']`, error)
    }
}
export const deleteProduct = async (id: number) => {
    try {
        // JSON-server {}
        await instance.delete(`/products/${id}`)

        // Nodejs
        // const response = await instance.delete(`/products/${product.id}`)
        // return response.data
    } catch (error) {
        console.log(`['DELETE_PRODUCT_ERROR']`, error)
    }
}
