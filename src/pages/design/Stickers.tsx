
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { DesignProvider } from '../../contexts/DesignContext';
import DesignCanvas from '../../components/design/DesignCanvas';
import DesignTools from '../../components/design/DesignTools';
import ProductPreview from '../../components/design/ProductPreview';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Home, ChevronRight, Undo, Redo, Save } from 'lucide-react';
import { useScrollReveal } from '../../utils/animations';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const StickersDesigner = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  
  return (
    <DesignProvider>
      <Helmet>
        <title>Stickers & Decals Designer | Kalmar Designs</title>
        <meta name="description" content="Create custom stickers and decals with our professional design tool. Choose from various shapes, sizes and materials for your perfect sticker design." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1">
          <section className="pt-24 pb-6 md:pt-28 md:pb-8 bg-gradient-to-br from-purple-50 to-orange-50">
            <div className="container px-4 mx-auto">
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">
                      <Home className="h-3.5 w-3.5" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/design">Design</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Stickers</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Stickers & Decals Designer</h1>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Undo className="h-4 w-4 mr-1" />
                    Undo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Redo className="h-4 w-4 mr-1" />
                    Redo
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Save Design
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          <section ref={sectionRef} className="py-8">
            <div className="container px-4 mx-auto">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Left sidebar - Design tools */}
                <div className="md:col-span-3">
                  <DesignTools />
                </div>
                
                {/* Center - Canvas area */}
                <div className="md:col-span-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 h-full flex flex-col">
                    <div className="flex-1 min-h-[500px]">
                      <DesignCanvas width={500} height={500} className="max-w-full mx-auto" />
                    </div>
                  </div>
                </div>
                
                {/* Right sidebar - Product preview */}
                <div className="md:col-span-3">
                  <ProductPreview />
                </div>
              </div>
              
              <div className="mt-10 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Sticker Design Guide</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Material Selection</h3>
                    <p className="text-sm text-gray-600">
                      Choose from matte, glossy, holographic, or clear vinyl for your stickers. Consider where your stickers will be used - outdoor stickers need UV resistance for durability.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Cut Types</h3>
                    <p className="text-sm text-gray-600">
                      Die-cut stickers follow the exact shape of your design, while kiss-cut stickers are cut to shape but remain on a backing. Choose based on your design complexity.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Size & Resolution</h3>
                    <p className="text-sm text-gray-600">
                      For best quality, design at 300 DPI or higher. Remember that small text may be difficult to read on smaller stickers, so keep designs clean and simple.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Popular Sticker Products</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Circle Stickers', 'Die-Cut Stickers', 'Holographic Stickers', 'Bumper Stickers'].map((product, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={`https://source.unsplash.com/random/300x300?sticker,${index+1}`}
                          alt={product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{product}</h3>
                        <p className="text-sm text-gray-600 mb-2">From $3.99</p>
                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DesignProvider>
  );
};

export default StickersDesigner;
