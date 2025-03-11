
import React from 'react';
import { useDesign } from '../../contexts/DesignContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Save, Share2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductPreviewProps {
  className?: string;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ className }) => {
  const { designState, exportDesign, saveDesign } = useDesign();
  const [view, setView] = React.useState<'front' | 'back' | '3d'>('front');
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock product data
  const productData = {
    tshirt: {
      name: 'Premium T-Shirt',
      description: '100% cotton, pre-shrunk, durable and comfortable fit',
      price: 24.99,
      colors: [
        { name: 'White', value: 'white', hex: '#ffffff' },
        { name: 'Black', value: 'black', hex: '#000000' },
        { name: 'Navy', value: 'navy', hex: '#000080' },
        { name: 'Red', value: 'red', hex: '#ff0000' },
        { name: 'Green', value: 'green', hex: '#008000' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      mockups: {
        front: '/placeholder.svg',
        back: '/placeholder.svg',
        model: '/placeholder.svg',
      }
    },
    hoodie: {
      name: 'Pullover Hoodie',
      description: 'Warm and cozy 80/20 cotton/polyester blend',
      price: 39.99,
      colors: [
        { name: 'White', value: 'white', hex: '#ffffff' },
        { name: 'Black', value: 'black', hex: '#000000' },
        { name: 'Gray', value: 'gray', hex: '#808080' },
        { name: 'Blue', value: 'blue', hex: '#0000ff' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      mockups: {
        front: '/placeholder.svg',
        back: '/placeholder.svg',
        model: '/placeholder.svg',
      }
    },
    sticker: {
      name: 'Custom Sticker',
      description: 'Waterproof vinyl, UV resistant, perfect for outdoor use',
      price: 3.99,
      sizes: ['2"x2"', '3"x3"', '4"x4"', '5"x5"', 'Custom'],
      types: ['Matte', 'Glossy', 'Holographic', 'Clear'],
      mockups: {
        front: '/placeholder.svg',
        back: null,
        model: '/placeholder.svg',
      }
    },
    card: {
      name: 'Business Card',
      description: 'Premium 350gsm paper with smooth matte finish',
      price: 19.99,
      sizes: ['Standard (3.5"x2")', 'Square (2.5"x2.5")', 'Mini (2.75"x1.5")'],
      types: ['Matte', 'Glossy', 'Spot UV', 'Silk'],
      mockups: {
        front: '/placeholder.svg',
        back: '/placeholder.svg',
        model: '/placeholder.svg',
      }
    },
  };

  // Get current product data based on product type
  const product = productData[designState.productType as keyof typeof productData] || productData.tshirt;
  
  // Handle add to cart
  const handleAddToCart = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Product added to cart!');
    }, 1500);
  };
  
  // Handle share design
  const handleShareDesign = () => {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: designState.name,
        url: url
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying link:', err));
    }
  };

  const productView = (
    <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border">
      <img 
        src={product.mockups[view] || product.mockups.front} 
        alt={`${product.name} ${view} view`}
        className="w-full h-full object-contain"
      />
      
      {/* Design overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* This would be a rendered version of the design */}
        {designState.objects.length > 0 ? (
          <div className="max-w-[60%] max-h-[40%] p-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-md p-1 text-sm text-center">
              Design Preview
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 max-w-[80%]">
            <p className="font-medium">Your design will appear here</p>
            <p className="text-xs mt-1">Add elements from the design tools</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg overflow-hidden", className)}>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-1">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        
        <Tabs defaultValue="preview" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="order">Order</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="pt-4">
            <div className="flex justify-center mb-4">
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={view === 'front' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('front')}
                  className="rounded-r-none"
                >
                  Front
                </Button>
                
                <Button
                  variant={view === 'back' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('back')}
                  className="rounded-none"
                  disabled={!product.mockups.back}
                >
                  Back
                </Button>
                
                <Button
                  variant={view === '3d' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('3d')}
                  className="rounded-l-none"
                >
                  3D View
                </Button>
              </div>
            </div>
            
            {productView}
            
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportDesign('png')}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareDesign}
                className="text-xs"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveDesign()}
                className="text-xs"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="options" className="pt-4">
            <div className="space-y-4">
              {/* Color selection */}
              {product.colors && (
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color.value}
                        className={cn(
                          "w-8 h-8 rounded-full cursor-pointer border-2 hover:scale-110 transition-transform",
                          designState.productColor === color.value
                            ? "border-primary"
                            : "border-transparent",
                          color.value === 'white' ? "border-gray-200" : ""
                        )}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => designState.productColor !== color.value && 
                          dispatch({ type: 'SET_PRODUCT_COLOR', payload: color.value })}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select
                  className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                  value={designState.productSize}
                  onChange={(e) => dispatch({ type: 'SET_PRODUCT_SIZE', payload: e.target.value })}
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size.toLowerCase()}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Material/type selection if available */}
              {product.types && (
                <div>
                  <label className="block text-sm font-medium mb-2">Material</label>
                  <select
                    className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                  >
                    {product.types.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Quantity selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="order" className="pt-4">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Price:</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-500">
                  <span>Quantity:</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-500">
                  <span>Shipping:</span>
                  <span>$4.99</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${(product.price + 4.99).toFixed(2)}</span>
              </div>
              
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Free shipping on orders over $50
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPreview;
