import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage'
import ProductDetailPage from '@/pages/ProductDetail'
import AuthPage from '@/pages/auth'
import ManageDashboardPage from '@/pages/manager/dashboard'
import ManagerProductPage from '@/pages/manager/product'
import AddProduct from '@/pages/manager/product/add'
import EditProduct from '@/pages/manager/product/edit'
import ManagerUserPage from '@/pages/manager/user'

import { Route, Routes } from 'react-router-dom'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='login' element={<AuthPage />} />
                <Route path='signin' element={<AuthPage />} />
                <Route path='products/:id' element={<ProductDetailPage />} />
            </Route>
            <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<ManageDashboardPage />} />
                <Route path='products' element={<ManagerProductPage />} />
                <Route path='users' element={<ManagerUserPage />} />
                <Route path='product/add' element={<AddProduct />} />
                <Route path='product/edit/:id' element={<EditProduct />} />
            </Route>
        </Routes>
    )
}

export default Routers
