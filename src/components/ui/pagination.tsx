import React from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'

export function Pagination({ page, totalPage }: { page: number; totalPage: number }) {
    const navigate = useNavigate()
    return (
        <div className='flex items-center gap-4'>
            <Button
                variant={'outlined'}
                onClick={() => navigate(`?page=${page - 1}`)}
                disabled={page === 1}
                className='flex items-center gap-2'
                size='sm'
            >
                <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' /> Previous
            </Button>
            <div className='flex items-center gap-2'>
                {Array(totalPage)
                    .fill(0)
                    .map((_, index) => (
                        <NavLink to={`?page=${index + 1}`}>
                            <IconButton
                                key={index + 1}
                                variant={page && index + 1 === +page ? 'filled' : 'text'}
                                size='sm'
                            >
                                {index + 1}
                            </IconButton>
                        </NavLink>
                    ))}
            </div>
            <Button
                variant='text'
                onClick={() => navigate(`?page=${page + 1}`)}
                disabled={page >= totalPage}
                className='flex items-center gap-2 '
            >
                Next
                <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
            </Button>
        </div>
    )
}
