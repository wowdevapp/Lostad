
import Navbar from '@/components/layout/home/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Losstad',
    description: 'Hello welcome to Losstad',
};

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="flex items-center justify-center overflow-hidden">
                <main className="flex-1 overflow-hidden bg-[#F2F2F2]">
                    <div className="bg-white">
                        {/* Navbar */}
                        <Navbar />
                        {/* Hero Section */}
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
