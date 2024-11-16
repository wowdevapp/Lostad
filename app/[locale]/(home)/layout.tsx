
import Navbar from '@/components/layout/home/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Losstad',
    description: 'Hello welcome to Losstad',
};

export default function LocaleLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="flex flex-col items-center justify-center overflow-hidden  w-full  bg-[#F2F2F2]">
                {/* Navbar */}
                <Navbar />
                {/* Hero Section */}
                {children}
            </div>
        </>
    );
}
