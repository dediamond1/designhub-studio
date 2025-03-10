
import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { BarChart, LineChart, PieChart } from 'recharts';
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  const orderData = [
    { name: 'Jan', orders: 40 },
    { name: 'Feb', orders: 30 },
    { name: 'Mar', orders: 45 },
    { name: 'Apr', orders: 50 },
    { name: 'May', orders: 65 },
    { name: 'Jun', orders: 60 },
  ];

  const productData = [
    { name: 'T-Shirts', value: 40 },
    { name: 'Business Cards', value: 25 },
    { name: 'Posters', value: 15 },
    { name: 'Decals', value: 20 },
  ];

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard 
                title="Total Revenue" 
                value="85,320 kr" 
                change="+12.3%" 
                trend="up"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <MetricCard 
                title="Total Orders" 
                value="643" 
                change="+8.7%" 
                trend="up"
                icon={<ShoppingCart className="h-5 w-5" />}
              />
              <MetricCard 
                title="New Customers" 
                value="49" 
                change="-2.5%" 
                trend="down"
                icon={<Users className="h-5 w-5" />}
              />
              <MetricCard 
                title="Conversion Rate" 
                value="3.6%" 
                change="+0.8%" 
                trend="up"
                icon={<TrendingUp className="h-5 w-5" />}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Sales Overview</h3>
                  <select className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                    <option value="6months">Last 6 Months</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="1month">Last Month</option>
                  </select>
                </div>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-32 w-32 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground ml-4">
                    Chart visualization will appear here with real data integration
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Orders Trend</h3>
                  <select className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                    <option value="6months">Last 6 Months</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="1month">Last Month</option>
                  </select>
                </div>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-32 w-32 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground ml-4">
                    Chart visualization will appear here with real data integration
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">Product Categories</h3>
                <div className="h-[250px] flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground ml-4">
                    Chart visualization will appear here
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">Customer Demographics</h3>
                <div className="h-[250px] flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground ml-4">
                    Chart visualization will appear here
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Custom T-Shirt', sales: 125, revenue: '24,875 kr' },
                    { name: 'Business Cards', sales: 98, revenue: '9,702 kr' },
                    { name: 'Vinyl Decals', sales: 76, revenue: '11,324 kr' },
                    { name: 'Large Format Posters', sales: 54, revenue: '21,546 kr' },
                    { name: 'Promotional Flyers', sales: 43, revenue: '3,827 kr' }
                  ].map((product, idx) => (
                    <li key={idx} className="flex justify-between items-center p-2 rounded hover:bg-muted">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <p className="font-medium">{product.revenue}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, trend, icon }: MetricCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-3">
        {trend === 'up' ? (
          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
        <span className="text-xs text-muted-foreground ml-1">from last month</span>
      </div>
    </div>
  );
};

export default Analytics;
