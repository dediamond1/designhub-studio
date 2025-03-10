
import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { Clock, DollarSign, Package, ShoppingCart, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample order data
const orders = [
  {
    id: 'ORD-1234',
    customer: 'Johan Andersson',
    date: '2025-03-05',
    total: '295.00',
    status: 'completed',
    items: 3
  },
  {
    id: 'ORD-1235',
    customer: 'Emma Nilsson',
    date: '2025-03-07',
    total: '189.50',
    status: 'processing',
    items: 2
  },
  {
    id: 'ORD-1236',
    customer: 'Lars Johansson',
    date: '2025-03-08',
    total: '450.00',
    status: 'shipping',
    items: 5
  },
  {
    id: 'ORD-1237',
    customer: 'Anna Lindberg',
    date: '2025-03-09',
    total: '120.00',
    status: 'pending',
    items: 1
  },
  {
    id: 'ORD-1238',
    customer: 'Karl Svensson',
    date: '2025-03-10',
    total: '345.75',
    status: 'processing',
    items: 4
  }
];

const Orders = () => {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                + New Order
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
              <OrderStat icon={<ShoppingCart className="h-5 w-5" />} label="Total Orders" value="245" />
              <OrderStat icon={<Clock className="h-5 w-5" />} label="Pending" value="12" />
              <OrderStat icon={<Package className="h-5 w-5" />} label="Processing" value="16" />
              <OrderStat icon={<Truck className="h-5 w-5" />} label="Shipped" value="43" />
            </div>

            <div className="rounded-md border">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{order.id}</td>
                          <td className="p-4 align-middle">{order.customer}</td>
                          <td className="p-4 align-middle">{order.date}</td>
                          <td className="p-4 align-middle">{order.items}</td>
                          <td className="p-4 align-middle">${order.total}</td>
                          <td className="p-4 align-middle">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                View
                              </button>
                              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const OrderStat = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'processing':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case 'shipping':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      getStatusColor()
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Orders;
