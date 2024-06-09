import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Test',
  description: 'Dashboard test for frontend developer position',
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-[#F2F2F2]">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
}
