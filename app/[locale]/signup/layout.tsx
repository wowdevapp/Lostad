import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frontend Test',
    description: 'Dashboard test for frontend developer position',
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
