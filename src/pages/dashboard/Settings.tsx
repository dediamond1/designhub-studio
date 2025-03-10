
import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

const Settings = () => {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
            
            <div className="space-y-6">
              <div className="rounded-lg border">
                <div className="px-4 py-3 border-b bg-muted/50">
                  <h2 className="text-lg font-medium">Store Profile</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="store-name" className="text-sm font-medium leading-none">
                        Store Name
                      </label>
                      <input
                        id="store-name"
                        defaultValue="Kalmar Studio"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        defaultValue="contact@kalmarstudio.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium leading-none">
                        Phone
                      </label>
                      <input
                        id="phone"
                        defaultValue="+46 70 123 4567"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="currency" className="text-sm font-medium leading-none">
                        Currency
                      </label>
                      <select
                        id="currency"
                        defaultValue="SEK"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="SEK">Swedish Krona (SEK)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="USD">US Dollar (USD)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border">
                <div className="px-4 py-3 border-b bg-muted/50">
                  <h2 className="text-lg font-medium">Address</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="text-sm font-medium leading-none">
                        Street Address
                      </label>
                      <input
                        id="address"
                        defaultValue="Storgatan 123"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium leading-none">
                        City
                      </label>
                      <input
                        id="city"
                        defaultValue="Kalmar"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="postal-code" className="text-sm font-medium leading-none">
                        Postal Code
                      </label>
                      <input
                        id="postal-code"
                        defaultValue="392 45"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium leading-none">
                        Country
                      </label>
                      <select
                        id="country"
                        defaultValue="SE"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="SE">Sweden</option>
                        <option value="DK">Denmark</option>
                        <option value="NO">Norway</option>
                        <option value="FI">Finland</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border">
                <div className="px-4 py-3 border-b bg-muted/50">
                  <h2 className="text-lg font-medium">Site Settings</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Maintenance Mode</p>
                        <p className="text-sm text-muted-foreground">
                          Put your store in maintenance mode while you make updates
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable User Reviews</p>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to leave reviews on products
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter Popup</p>
                        <p className="text-sm text-muted-foreground">
                          Show a newsletter subscription popup to visitors
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Cancel
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
