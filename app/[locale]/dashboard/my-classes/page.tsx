'use client'

import { CalassesTable } from '@/components/tables/classes/ClassesTable'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/routing'
import React from 'react'

type Props = {}

function Page({ }: Props) {

    const router = useRouter()
    return (
        <div className='px-4 py-4 mt-4 bg-white rounded-sm'>
            <div className='flex justify-between'>
                <h1>My classes</h1>
                <Button onClick={() => { router.push('/dashboard/my-classes/create') }} variant={'default'}>
                    Create Class
                </Button>
            </div>
            <CalassesTable />
        </div>
    )
}

export default Page