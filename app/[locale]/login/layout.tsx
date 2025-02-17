import type { Metadata } from 'next';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Losstad/ Login',
};

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex items-center justify-center h-screen overflow-hidden">
                <main className="flex-1 overflow-hidden bg-[#F2F2F2]">
                    {children}
                </main>
            </div>
        </>
    );
}
