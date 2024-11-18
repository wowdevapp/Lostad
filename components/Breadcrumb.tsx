'use client'

import React from 'react'
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Breadcrumb as BreadcrumbContainer
} from './ui/breadcrumb'
import { Link } from '@/i18n/routing'
import useBreadcrumb from '@/hooks/useBreadcrumb';
type Props = {
}



export default function Breadcrumb({ }: Props) {
    const breadcrumbItems = useBreadcrumb({});
    return (
        <BreadcrumbContainer className="hidden md:flex">
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {item.isCurrentPage ? (
                                <BreadcrumbPage className='text-blue-600'>{item.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={item.href || '#'}>{item.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </BreadcrumbContainer>
    )
}