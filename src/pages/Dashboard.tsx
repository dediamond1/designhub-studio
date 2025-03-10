
import React from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // You could add authentication check here in the future
    // if (!isAuthenticated) navigate('/login');
  }, [navigate]);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DashboardCard 
                title="Orders" 
                value="24" 
                description="Active orders"
                onClick={() => navigate('/dashboard/orders')}
              />
              <DashboardCard 
                title="Products" 
                value="156" 
                description="Total products"
                onClick={() => navigate('/dashboard/products')}
              />
              <DashboardCard 
                title="Customers" 
                value="2,834" 
                description="Registered customers"
                onClick={() => navigate('/dashboard/customers')}
              />
              <DashboardCard 
                title="Designs" 
                value="487" 
                description="Saved designs"
                onClick={() => navigate('/dashboard/designs')}
              />
              <DashboardCard 
                title="Revenue" 
                value="$12,543" 
                description="This month"
                onClick={() => navigate('/dashboard/analytics')}
              />
              <DashboardCard 
                title="Settings" 
                value="" 
                description="Configure your store"
                onClick={() => navigate('/dashboard/settings')}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  onClick: () => void;
}

const DashboardCard = ({ title, value, description, onClick }: DashboardCardProps) => {
  return (
    <div 
      className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <h3 className="text-lg font-medium">{title}</h3>
        {value && <p className="text-3xl font-bold mt-2">{value}</p>}
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Dashboard;
