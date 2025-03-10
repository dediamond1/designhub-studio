
import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center h-10 w-full max-w-md">
          <div className="flex items-center h-10 rounded-md border border-input bg-background px-3 text-sm focus-within:ring-1 focus-within:ring-ring w-full">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              type="search"
              placeholder="Search..."
              className="flex h-9 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-10 w-10 hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@kalmarstudio.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
