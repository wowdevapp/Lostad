// components/auth/ProtectedRoute.tsx
'use client';
import { useAppSelector } from '@/app/store/reduxHooks';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token, isLoading } = useAppSelector((state: any) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if we're not on the login page and there's no token
        if (!isLoading && !token && pathname !== '/login') {
            console.log('Redirecting to login 1');
            router.replace('/login');
        }
        // Check if we're on the login page and there is a token
        if (!isLoading && token && pathname === '/login') {
            console.log('Redirecting to login 2');
            router.replace('/dashboard');
        }
    }, [token, isLoading, router, pathname]);

    // Show loading state while checking authentication
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Only render children if authenticated or on login page
    if (!token && pathname !== '/login') {
        console.log('Redirecting to login 3');

        return null;
    }

    return <>{children}</>;
}