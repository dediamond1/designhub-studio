
import React, { useState, useRef } from 'react';
import { useScrollReveal } from '../../utils/animations';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sticker, 
  CircleDot, 
  Square, 
  Heart,
  Upload, 
  Plus, 
  Save,
  RotateCcw
} from 'lucide-react';

const StickersDesigner = () => {
  const [activeTab, setActiveTab] = useState('circle');
  const [design, setDesign] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  
  const stickerTypes = [
    { id: 'circle', name: 'Circle', icon: <CircleDot className="h-5 w-5" /> },
    { id: 'square', name: 'Square', icon: <Square className="h-5 w-5" /> },
    { id: 'custom', name: 'Custom Shape', icon: <Heart className="h-5 w-5" /> },
  ];
  
  const templates = [
    { id: 1, name: 'Pattern', img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Geometric', img: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Abstract', img: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
  ];
  
  const handleUpload = () => {
    // This would normally open a file picker and upload an image
    alert('Image upload functionality would be implemented here');
    
    // For demo purposes, set a placeholder image
    setDesign('https://images.unsplash.com/photo-1533709752211-118fcaf03312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80');
  };
  
  const handleSelectTemplate = (templateId: number) => {
    // In a real implementation, this would load the template
    setDesign(templates.find(t => t.id === templateId)?.img || null);
  };
  
  const handleSaveDesign = () => {
    // This would save the design to the user's account
    alert('Design saved successfully!');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 md:pt-32 md:pb-16 bg-gradient-to-br from-kalmar-50 to-kalmar-100/50">
          <div className="section-container">
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Stickers & Decals Designer</h1>
              <p className="text-foreground/70 text-lg">
                Create custom stickers and decals in any shape and size you need.
              </p>
            </div>
          </div>
        </section>
        
        <section ref={sectionRef} className="py-16">
          <div className="section-container">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Designer Panel */}
              <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Sticker Shape</h3>
                  <Tabs defaultValue="circle" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-2">
                      {stickerTypes.map((type) => (
                        <TabsTrigger key={type.id} value={type.id}>
                          {type.icon}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {stickerTypes.map((type) => (
                      <TabsContent key={type.id} value={type.id}>
                        <p className="text-sm text-muted-foreground">{type.name}</p>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
                
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Design Tools</h3>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={handleUpload} 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Size (inches)</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>2 x 2</option>
                        <option>3 x 3</option>
                        <option>4 x 4</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Templates</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {templates.map((template) => (
                      <div 
                        key={template.id}
                        className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <img 
                          src={template.img} 
                          alt={template.name} 
                          className="w-full h-24 object-cover"
                        />
                        <div className="p-2 text-center text-xs">{template.name}</div>
                      </div>
                    ))}
                    
                    <div className="border rounded-md overflow-hidden flex items-center justify-center h-24 cursor-pointer hover:border-primary transition-colors">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Preview Area */}
              <div className="md:col-span-8 lg:col-span-6">
                <div className="bg-white rounded-xl border shadow-sm p-6 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                      <Button onClick={handleSaveDesign} size="sm">
                        <Save className="h-4 w-4 mr-1" />
                        Save Design
                      </Button>
                    </div>
                  </div>
                  
                  <div 
                    ref={canvasRef}
                    className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    {activeTab === 'circle' && (
                      <div className="relative w-64 h-64 mx-auto">
                        <div className="absolute inset-0 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-white">
                          {design ? (
                            <img
                              src={design}
                              alt="Sticker Design"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center text-muted-foreground p-4">
                              <Sticker className="h-12 w-12 mx-auto mb-2 opacity-40" />
                              <p>Upload an image or choose a template</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'square' && (
                      <div className="relative w-64 h-64 mx-auto">
                        <div className="absolute inset-0 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-white">
                          {design ? (
                            <img
                              src={design}
                              alt="Sticker Design"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center text-muted-foreground p-4">
                              <Square className="h-12 w-12 mx-auto mb-2 opacity-40" />
                              <p>Upload an image or choose a template</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'custom' && (
                      <div className="relative w-64 h-64 mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 text-center text-muted-foreground">
                            <Heart className="h-48 w-48 mx-auto stroke-1 fill-white" />
                            <p className="mt-2">Custom shape preview</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="md:col-span-12 lg:col-span-3">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Vinyl Stickers</h4>
                      <p className="text-sm text-muted-foreground">Weatherproof, durable</p>
                      <p className="text-lg font-bold mt-1">$12.99 / sheet</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>1 sheet (10 stickers)</option>
                        <option>5 sheets (50 stickers)</option>
                        <option>10 sheets (100 stickers)</option>
                        <option>25 sheets (250 stickers)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Material</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>Matte Vinyl</option>
                        <option>Glossy Vinyl</option>
                        <option>Clear Vinyl</option>
                        <option>Holographic</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cut Type</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>Kiss Cut</option>
                        <option>Die Cut</option>
                      </select>
                    </div>
                    
                    <Button className="w-full mt-4">
                      Add to Cart
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Free shipping on orders over $25
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StickersDesigner;
