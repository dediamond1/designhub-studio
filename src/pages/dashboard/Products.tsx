
import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 'PROD-001',
    name: 'Custom T-Shirt',
    category: 'Apparel',
    price: '199.00',
    stock: 125,
    status: 'Active'
  },
  {
    id: 'PROD-002',
    name: 'Business Cards',
    category: 'Stationery',
    price: '99.00',
    stock: 500,
    status: 'Active'
  },
  {
    id: 'PROD-003',
    name: 'Large Format Poster',
    category: 'Signage',
    price: '399.00',
    stock: 30,
    status: 'Active'
  },
  {
    id: 'PROD-004',
    name: 'Vinyl Decals',
    category: 'Stickers',
    price: '149.00',
    stock: 200,
    status: 'Low Stock'
  },
  {
    id: 'PROD-005',
    name: 'Custom Mugs',
    category: 'Merchandise',
    price: '129.00',
    stock: 75,
    status: 'Active'
  },
  {
    id: 'PROD-006',
    name: 'Promotional Flyers',
    category: 'Marketing',
    price: '89.00',
    stock: 0,
    status: 'Out of Stock'
  }
];

const Products = () => {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Products</h1>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </button>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
                  <Search className="h-4 w-4 text-muted-foreground mr-2 flex-none" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              
              <div className="flex flex-row gap-2">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-1 focus:ring-ring">
                  <option value="">All Categories</option>
                  <option value="apparel">Apparel</option>
                  <option value="stationery">Stationery</option>
                  <option value="signage">Signage</option>
                  <option value="stickers">Stickers</option>
                  <option value="merchandise">Merchandise</option>
                  <option value="marketing">Marketing</option>
                </select>
                
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-1 focus:ring-ring">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price (SEK)</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{product.id}</td>
                          <td className="p-4 align-middle font-medium">{product.name}</td>
                          <td className="p-4 align-middle">{product.category}</td>
                          <td className="p-4 align-middle">{product.price}</td>
                          <td className="p-4 align-middle">{product.stock}</td>
                          <td className="p-4 align-middle">
                            <ProductStatusBadge status={product.status} />
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <button className="inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 w-9 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </button>
                              <button className="inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
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
                    Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">6</span> results
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

const ProductStatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'Low Stock':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case 'Out of Stock':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export default Products;
