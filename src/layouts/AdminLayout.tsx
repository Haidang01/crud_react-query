import { Sidebar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='flex gap-5'>
            <aside>
                <Sidebar />
            </aside>
            <main style={{ width: '100%' }}>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
