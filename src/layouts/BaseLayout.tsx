import { Footer } from '@/components/footer'
import { NavbarDefault } from '@/components/navbar'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
    return (
        <>
            <NavbarDefault />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default BaseLayout
