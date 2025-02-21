'use client'

import { fetchCourses } from '@/app/store/features/classSlice'
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks'
import { CalassesTable } from '@/components/dashboard/classes/ClassesTable'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'

type Props = {}

function Page({ }: Props) {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { courses, isLoading, error } = useAppSelector((state) => state.course)



    useEffect(() => {
        dispatch(fetchCourses())
    }, [])
    return (
        <div className='px-4 py-4 mt-4 bg-white rounded-sm'>
            <div className='flex justify-between'>
                <h1>My classes</h1>
                <Button onClick={() => { router.push('/dashboard/my-classes/create') }} variant={'default'}>
                    Create Class
                </Button>
            </div>
            <CalassesTable
                data={courses}
                isLoading={isLoading}
            />
        </div>
    )
}

export default Page