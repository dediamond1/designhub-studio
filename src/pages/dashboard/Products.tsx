
import React, { useState } from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useFetch, useDelete } from '@/hooks/useApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const { data: products = [], isLoading, error, refetch } = useFetch<Product[]>('/api/products', ['products']);
  const deleteProduct = useDelete('/api/products', ['products']);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(id);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStatus = !statusFilter || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(products.map(product => product.category)));
  const statuses = Array.from(new Set(products.map(product => product.status)));

  if (error) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-7xl">
              <div className="bg-destructive/10 p-4 rounded-md text-destructive">
                <p>Failed to load products. Please try again later.</p>
                <Button variant="outline" className="mt-2" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Products</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  {/* Add product form would go here */}
                  <p className="text-muted-foreground">Product form would be implemented here</p>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
                  <Search className="h-4 w-4 text-muted-foreground mr-2 flex-none" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-row gap-2">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-1 focus:ring-ring"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-1 focus:ring-ring"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
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
                        {filteredProducts.map((product) => (
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
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="secondary" size="icon">
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Product</DialogTitle>
                                    </DialogHeader>
                                    {/* Edit product form would go here */}
                                    <p className="text-muted-foreground">Edit form would be implemented here</p>
                                  </DialogContent>
                                </Dialog>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleDelete(product.id)}
                                  disabled={deleteProduct.isLoading}
                                >
                                  {deleteProduct.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between px-4 py-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{filteredProducts.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" disabled>
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
