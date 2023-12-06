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
import PrivateRoute from '@/routes/PriveRouter.tsx'

const Routers = () => {
    const checkUserInLocalStorage = (): boolean => {
        const userString = localStorage.getItem('user')
        if (userString) {
            const data = JSON.parse(userString)
            if (data && data.user.id == 1) {
                return true // Nếu user tồn tại và có id là 1
            }
        }
        return false // Ngược lại, không có user hoặc id không phải là 1
    }
    const isAuthenticated = checkUserInLocalStorage()
    return (
        <Routes>
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='login' element={<AuthPage />} />
                <Route path='register' element={<AuthPage />} />
                <Route path='product/:id' element={<ProductDetailPage />} />
            </Route>
            <Route path='/admin' element={<AdminLayout />}>
                <Route element={<PrivateRoute auth={isAuthenticated} />}>
                    <Route index element={<ManageDashboardPage />} />
                    <Route path='products' element={<ManagerProductPage />} />
                    <Route path='users' element={<ManagerUserPage />} />
                    <Route path='product/add' element={<AddProduct />} />
                    <Route path='product/edit/:id' element={<EditProduct />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Routers
