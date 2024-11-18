import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Breadcrumb from '@/components/Breadcrumb';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';
import { useLocale } from 'next-intl';

export const metadata: Metadata = {
  title: 'Lostad',
  description: 'Dashboard',
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  return (
    <ProtectedRoute>
      <div className={`flex h-screen overflow-hidden ${locale === 'ar' ? 'rtl text-right' : 'ltr text-left'}`}>
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-[#F2F2F2]">
          <Header />
          <div className='p-4'>
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
