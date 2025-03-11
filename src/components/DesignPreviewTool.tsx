
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { 
  Upload, 
  RefreshCw, 
  Download,
  Save,
  Shirt,
  Sticker,
  BookOpen,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';

const DesignPreviewTool = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');
  
  const [selectedProduct, setSelectedProduct] = useState('tshirt');
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const products = [
    { id: 'tshirt', icon: <Shirt className="h-6 w-6" />, label: 'T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'hoodie', icon: <Shirt className="h-6 w-6" />, label: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'sticker', icon: <Sticker className="h-6 w-6" />, label: 'Sticker', image: 'https://images.unsplash.com/photo-1535450216233-37512d7595a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'brochure', icon: <BookOpen className="h-6 w-6" />, label: 'Brochure', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 'card', icon: <CreditCard className="h-6 w-6" />, label: 'Business Card', image: 'https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDesignImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setDesignImage(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-mixed">
            {t('designPreview.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('designPreview.description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Product Sidebar */}
              <div className="bg-gradient-soft-purple p-6 border-r border-purple-100">
                <h3 className="font-medium mb-4">{t('designPreview.selectProduct')}</h3>
                
                <div className="space-y-2">
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product.id)}
                      className={cn(
                        "w-full flex items-center p-3 rounded-lg text-left text-sm transition-colors",
                        selectedProduct === product.id
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-purple-50"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center mr-3",
                        selectedProduct === product.id
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      )}>
                        {product.icon}
                      </div>
                      <span>{product.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">{t('designPreview.upload')}</h3>
                  
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
                      isDragging 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {t('uploadFiles.dragDrop')}
                    </p>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              {/* Preview Area */}
              <div className="col-span-2 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">{t('designPreview.preview')}</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-md hover:bg-purple-50">
                      <RefreshCw className="h-4 w-4 text-purple-600" />
                    </button>
                    <button 
                      className="p-2 rounded-md hover:bg-purple-50"
                      disabled={!designImage}
                    >
                      <Download className="h-4 w-4 text-purple-600" />
                    </button>
                    <button 
                      className="p-2 rounded-md hover:bg-purple-50"
                      disabled={!designImage}
                    >
                      <Save className="h-4 w-4 text-purple-600" />
                    </button>
                  </div>
                </div>

                <div className="relative bg-gradient-soft-purple rounded-lg overflow-hidden h-72 md:h-96 flex items-center justify-center border border-purple-100">
                  {/* Product Preview */}
                  <img 
                    src={products.find(p => p.id === selectedProduct)?.image || ''} 
                    alt={selectedProduct}
                    className="max-h-full max-w-full object-contain"
                  />
                  
                  {/* Design Overlay */}
                  {designImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={designImage} 
                        alt="Your design"
                        className="max-h-32 max-w-32 md:max-h-40 md:max-w-40 object-contain"
                      />
                    </div>
                  )}

                  {/* Placeholder Message */}
                  {!designImage && (
                    <div className="text-center text-gray-400">
                      <Upload className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>Upload your design to see preview</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    {t('buttons.try')} {products.find(p => p.id === selectedProduct)?.label}
                  </button>
                  
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 transition-colors shadow-purple">
                    {t('buttons.requestQuote')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignPreviewTool;
