
import React, { useState, useRef } from 'react';
import { useScrollReveal } from '../../utils/animations';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Shirt, 
  ArrowRight, 
  Plus, 
  Upload, 
  Text, 
  Image as ImageIcon, 
  Save,
  RotateCcw
} from 'lucide-react';

const ClothesDesigner = () => {
  const [activeTab, setActiveTab] = useState('tshirt');
  const [design, setDesign] = useState<string | null>(null);
  const [text, setText] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  
  const clothesTypes = [
    { id: 'tshirt', name: 'T-Shirt', icon: <Shirt className="h-5 w-5" /> },
    { id: 'hoodie', name: 'Hoodie', icon: <Shirt className="h-5 w-5" /> },
    { id: 'sweater', name: 'Sweater', icon: <Shirt className="h-5 w-5" /> },
  ];
  
  const templates = [
    { id: 1, name: 'Minimal', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Vintage', img: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Bold', img: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
  ];
  
  const handleUpload = () => {
    // This would normally open a file picker and upload an image
    alert('Image upload functionality would be implemented here');
    
    // For demo purposes, set a placeholder image
    setDesign('https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80');
  };
  
  const handleAddText = () => {
    if (text) {
      // In a real implementation, this would add text to the canvas
      alert(`Text "${text}" would be added to the design`);
    }
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4">T-Shirts & Clothes Designer</h1>
              <p className="text-foreground/70 text-lg">
                Create your own custom clothing with our easy-to-use design tool. Upload your images, add text, or choose from our templates.
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
                  <h3 className="text-lg font-semibold mb-4">Product Type</h3>
                  <Tabs defaultValue="tshirt" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-2">
                      {clothesTypes.map((type) => (
                        <TabsTrigger key={type.id} value={type.id}>
                          {type.icon}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {clothesTypes.map((type) => (
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
                      <label className="text-sm font-medium">Add Text</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md text-sm"
                          placeholder="Your text here"
                        />
                        <Button 
                          onClick={handleAddText} 
                          size="sm" 
                          variant="outline"
                        >
                          <Text className="h-4 w-4" />
                        </Button>
                      </div>
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
                    className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    {activeTab === 'tshirt' && (
                      <div className="relative w-3/5 mx-auto">
                        <img 
                          src="/placeholder.svg" 
                          alt="T-shirt mockup" 
                          className="w-full h-auto"
                        />
                        
                        {design && (
                          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/2 h-1/3">
                            <img
                              src={design}
                              alt="Design"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'hoodie' && (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Hoodie preview would appear here</p>
                      </div>
                    )}
                    
                    {activeTab === 'sweater' && (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Sweater preview would appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="md:col-span-12 lg:col-span-3">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Premium T-Shirt</h4>
                      <p className="text-sm text-muted-foreground">100% cotton, comfortable fit</p>
                      <p className="text-lg font-bold mt-1">$24.99</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Size</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                        <option>X-Large</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Color</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>White</option>
                        <option>Black</option>
                        <option>Navy</option>
                        <option>Gray</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    
                    <Button className="w-full mt-4">
                      Add to Cart
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Free shipping on orders over $50
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

export default ClothesDesigner;
