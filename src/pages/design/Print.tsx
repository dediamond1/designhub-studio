
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

const PrintDesigner = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  
  // Determine print dimensions based on selected product
  const printDimensions = {
    width: 800,  // Business card width in pixels at 300 DPI
    height: 450  // Business card height in pixels at 300 DPI
  };
  
  return (
    <DesignProvider>
      <Helmet>
        <title>Business Cards & Print Design | Kalmar Designs</title>
        <meta name="description" content="Create professional business cards, brochures, and print materials with our design tool. Choose from premium templates or start from scratch." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1">
          <section className="pt-24 pb-6 md:pt-28 md:pb-8 bg-gradient-to-br from-purple-50 to-orange-50">
            <div className="container px-4 mx-auto">
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">
                        <Home className="h-3.5 w-3.5" />
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/design">Design</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Print</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Business Cards Designer</h1>
                
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
                    <div className="flex-1 min-h-[400px]">
                      <div className="flex justify-center mb-4">
                        <div className="flex p-1 bg-gray-100 rounded-lg">
                          <Button
                            variant="default"
                            size="sm"
                            className="rounded-r-none"
                          >
                            Front
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-l-none"
                          >
                            Back
                          </Button>
                        </div>
                      </div>
                      
                      <DesignCanvas width={printDimensions.width} height={printDimensions.height} className="max-w-full mx-auto" />
                      
                      <div className="mt-4 text-center text-xs text-gray-500">
                        <p>Business Card - 3.5" x 2" (standard size)</p>
                        <p>Safe area shown with dotted line. Keep important elements inside this area.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right sidebar - Product preview */}
                <div className="md:col-span-3">
                  <ProductPreview />
                </div>
              </div>
              
              <div className="mt-10 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Business Card Design Guide</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Bleed & Safe Zone</h3>
                    <p className="text-sm text-gray-600">
                      Keep important text and logos within the safe zone (dotted line), at least 0.125" from the edge. Extend background colors and images to the bleed line to avoid white edges.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Resolution & Color</h3>
                    <p className="text-sm text-gray-600">
                      Design at 300 DPI for sharp printing. Use CMYK color mode for accurate color reproduction. For best results with text, use pure black (C:0 M:0 Y:0 K:100).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Typography</h3>
                    <p className="text-sm text-gray-600">
                      Keep text at least 7pt for readability. Sans-serif fonts are more legible in small sizes. Limit your design to 2-3 different fonts for a clean, professional look.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Other Print Products</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Flyers', 'Brochures', 'Postcards', 'Letterheads'].map((product, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={`https://source.unsplash.com/random/300x300?print,${product.toLowerCase()}`}
                          alt={product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{product}</h3>
                        <p className="text-sm text-gray-600 mb-2">From $14.99</p>
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

export default PrintDesigner;
