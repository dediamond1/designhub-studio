
import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { Search, User, Mail, Phone, MoreHorizontal } from 'lucide-react';

// Sample customer data
const customers = [
  {
    id: 'CUST-1001',
    name: 'Johan Andersson',
    email: 'johan.andersson@example.com',
    phone: '+46 70 123 4567',
    orders: 8,
    totalSpent: '3,540.00',
    lastOrder: '2025-03-01'
  },
  {
    id: 'CUST-1002',
    name: 'Emma Nilsson',
    email: 'emma.nilsson@example.com',
    phone: '+46 73 234 5678',
    orders: 5,
    totalSpent: '1,895.50',
    lastOrder: '2025-02-15'
  },
  {
    id: 'CUST-1003',
    name: 'Lars Johansson',
    email: 'lars.johansson@example.com',
    phone: '+46 76 345 6789',
    orders: 12,
    totalSpent: '4,780.25',
    lastOrder: '2025-03-08'
  },
  {
    id: 'CUST-1004',
    name: 'Anna Lindberg',
    email: 'anna.lindberg@example.com',
    phone: '+46 70 456 7890',
    orders: 3,
    totalSpent: '970.00',
    lastOrder: '2025-01-20'
  },
  {
    id: 'CUST-1005',
    name: 'Karl Svensson',
    email: 'karl.svensson@example.com',
    phone: '+46 73 567 8901',
    orders: 6,
    totalSpent: '2,350.75',
    lastOrder: '2025-02-28'
  }
];

const Customers = () => {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Add Customer
              </button>
            </div>

            <div className="mb-6">
              <div className="flex h-10 w-full sm:max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
                <Search className="h-4 w-4 text-muted-foreground mr-2 flex-none" />
                <input
                  type="search"
                  placeholder="Search customers..."
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Contact</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Orders</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total Spent (SEK)</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Order</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{customer.id}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-muted">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{customer.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{customer.orders}</td>
                          <td className="p-4 align-middle">{customer.totalSpent}</td>
                          <td className="p-4 align-middle">{customer.lastOrder}</td>
                          <td className="p-4 align-middle">
                            <div className="flex justify-end">
                              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground" disabled>
                      Previous
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground" disabled>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;
