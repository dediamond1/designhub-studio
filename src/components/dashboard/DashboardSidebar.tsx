
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Box, 
  Home, 
  Package, 
  Settings, 
  ShoppingCart, 
  Users, 
  PaintBucket,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const sidebarItems = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Products', path: '/dashboard/products', icon: Package },
    { name: 'Customers', path: '/dashboard/customers', icon: Users },
    { name: 'Designs', path: '/dashboard/designs', icon: PaintBucket },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  ];
  
  // Admin-only items
  const adminItems = [
    { name: 'Team Members', path: '/dashboard/team', icon: UserPlus },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  // Determine which items to show based on user role
  const displayItems = [...sidebarItems, ...(user?.role === 'admin' ? adminItems : [])];

  return (
    <aside 
      className={cn(
        "bg-sidebar-background border-r border-border flex flex-col h-full transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="p-4 flex items-center justify-between h-[64px] border-b border-border">
        <NavLink 
          to="/" 
          className={cn(
            "font-bold text-lg transition-opacity",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          Kalmar Studio
        </NavLink>
        {!collapsed && <Box className="h-5 w-5" />}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-sm hover:bg-sidebar-accent text-sidebar-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {displayItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center p-2 rounded-md text-sm group transition-colors",
              isActive 
                ? "bg-sidebar-accent text-sidebar-primary font-medium" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/80",
              collapsed ? "justify-center" : "space-x-3"
            )}
          >
            <item.icon size={20} />
            <span className={cn(
              "transition-all duration-300",
              collapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            )}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center w-full p-2 rounded-md text-sm group transition-colors text-sidebar-foreground hover:bg-sidebar-accent/80"
        >
          <LogOut size={20} className={cn(collapsed ? "" : "mr-3")} />
          <span className={cn(
            "transition-all duration-300",
            collapsed ? "opacity-0 w-0 hidden" : "opacity-100"
          )}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
