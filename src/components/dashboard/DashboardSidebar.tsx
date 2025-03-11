
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  PencilRuler, 
  BarChart, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Mock user role for display purposes
  const mockUserRole = 'admin';

  const sidebarItems = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Products', path: '/dashboard/products', icon: Package },
    { name: 'Customers', path: '/dashboard/customers', icon: Users },
    { name: 'Designs', path: '/dashboard/designs', icon: PencilRuler },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const adminItems = [
    { name: 'Team Members', path: '/dashboard/team', icon: UserPlus },
  ];

  const displayItems = [...sidebarItems, ...(mockUserRole === 'admin' ? adminItems : [])];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-border transition-all duration-300 ease-in-out flex flex-col h-screen",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className={cn(
          "font-bold transition-opacity duration-200",
          collapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
          Kalmar Studio
        </h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-sidebar-accent/80 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="p-2 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {displayItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center p-2 rounded-md text-sm group transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-active-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/80",
                  collapsed && "justify-center"
                )}
              >
                <item.icon size={20} className={cn(collapsed ? "" : "mr-3")} />
                <span className={cn(
                  "transition-opacity duration-200",
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}>
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-md text-sm group transition-colors text-sidebar-foreground hover:bg-sidebar-accent/80"
        >
          <LogOut size={20} className={cn(collapsed ? "" : "mr-3")} />
          <span className={cn(
            "transition-opacity duration-200",
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
