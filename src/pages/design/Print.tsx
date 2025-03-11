
import React, { useState, useRef } from 'react';
import { useScrollReveal } from '../../utils/animations';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  CreditCard, 
  FileCard, 
  Upload, 
  Text, 
  Plus, 
  Save,
  RotateCcw
} from 'lucide-react';

const PrintDesigner = () => {
  const [activeTab, setActiveTab] = useState('businessCard');
  const [design, setDesign] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  
  const printTypes = [
    { id: 'businessCard', name: 'Business Card', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'flyer', name: 'Flyer', icon: <FileText className="h-5 w-5" /> },
    { id: 'brochure', name: 'Brochure', icon: <FileCard className="h-5 w-5" /> },
  ];
  
  const templates = [
    { id: 1, name: 'Corporate', img: 'https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Creative', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Modern', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
  ];
  
  const handleUpload = () => {
    // This would normally open a file picker and upload an image
    alert('Image upload functionality would be implemented here');
    
    // For demo purposes, set a placeholder image
    setDesign('https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80');
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Business Cards & Print Designer</h1>
              <p className="text-foreground/70 text-lg">
                Design professional business cards, flyers, and brochures with our easy-to-use tool.
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
                  <h3 className="text-lg font-semibold mb-4">Print Type</h3>
                  <Tabs defaultValue="businessCard" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-2">
                      {printTypes.map((type) => (
                        <TabsTrigger key={type.id} value={type.id}>
                          {type.icon}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {printTypes.map((type) => (
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
                      Upload Logo/Image
                    </Button>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Information</label>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        rows={4}
                        placeholder="Name&#10;Company&#10;Phone&#10;Email"
                      />
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
                    className="relative bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    {activeTab === 'businessCard' && (
                      <div className="relative w-full h-64 p-8 flex items-center justify-center">
                        <div className="w-96 h-48 rounded bg-white shadow-md flex items-center justify-center">
                          {design ? (
                            <img
                              src={design}
                              alt="Business Card Design"
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <p>Your business card preview</p>
                              <p className="text-sm">Choose a template or upload your design</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'flyer' && (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>Flyer preview would appear here</p>
                      </div>
                    )}
                    
                    {activeTab === 'brochure' && (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>Brochure preview would appear here</p>
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
                      <h4 className="font-medium">Premium Business Cards</h4>
                      <p className="text-sm text-muted-foreground">350gsm, matte finish</p>
                      <p className="text-lg font-bold mt-1">$29.99 / 100 cards</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>100 cards</option>
                        <option>250 cards</option>
                        <option>500 cards</option>
                        <option>1000 cards</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Paper Type</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>Standard (350gsm)</option>
                        <option>Premium (400gsm)</option>
                        <option>Luxury (450gsm)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Finish</label>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>Matte</option>
                        <option>Gloss</option>
                        <option>Silk</option>
                      </select>
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

export default PrintDesigner;
