import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard - MymensinghPost',
  description: 'Admin dashboard for MymensinghPost news portal',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and is an admin
  const session = await getServerSession();
  
  if (!session || session.user?.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-6">
        {children}
      </main>
    </div>
  );
}