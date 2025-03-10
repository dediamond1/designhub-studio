
import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { PaintBucket } from 'lucide-react';

const Designs = () => {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Customer Designs</h1>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Create Design
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for design cards */}
              {Array(9).fill(null).map((_, index) => (
                <div key={index} className="rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <PaintBucket className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Design #{index + 1}</h3>
                    <p className="text-sm text-muted-foreground">Created by Customer #{Math.floor(Math.random() * 100) + 1}</p>
                    <div className="flex gap-2 mt-4">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1">
                        View
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground flex-1">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Load More
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Designs;
