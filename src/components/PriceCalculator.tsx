
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const PriceCalculator = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');
  
  // Form state
  const [productType, setProductType] = useState('business-cards');
  const [quantity, setQuantity] = useState(500);
  const [size, setSize] = useState('standard');
  const [colors, setColors] = useState('full-color');
  const [material, setMaterial] = useState('standard');
  const [finishing, setFinishing] = useState('none');
  const [delivery, setDelivery] = useState('standard');
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate price based on selections
  useEffect(() => {
    let basePrice = 0;
    
    // Base price by product type
    switch (productType) {
      case 'business-cards':
        basePrice = 39;
        break;
      case 'brochures':
        basePrice = 89;
        break;
      case 'posters':
        basePrice = 59;
        break;
      case 'flyers':
        basePrice = 49;
        break;
      case 't-shirts':
        basePrice = 149;
        break;
      default:
        basePrice = 39;
    }
    
    // Adjust for quantity (simplified calculation)
    let quantityMultiplier = 1;
    if (quantity <= 100) quantityMultiplier = 1;
    else if (quantity <= 500) quantityMultiplier = 1.5;
    else if (quantity <= 1000) quantityMultiplier = 2;
    else quantityMultiplier = 3;
    
    // Adjust for options
    let sizeMultiplier = size === 'standard' ? 1 : 1.3;
    let colorMultiplier = colors === 'one-color' ? 0.8 : 1;
    let materialMultiplier = material === 'premium' ? 1.2 : 1;
    let finishingAddition = finishing === 'none' ? 0 : 20;
    let deliveryAddition = delivery === 'express' ? 15 : 0;
    
    // Calculate final price
    const calculatedPrice = (basePrice * quantityMultiplier * sizeMultiplier * colorMultiplier * materialMultiplier) + finishingAddition + deliveryAddition;
    
    setTotalPrice(Math.round(calculatedPrice));
  }, [productType, quantity, size, colors, material, finishing, delivery]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-kalmar-100 to-kalmar-200 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-kalmar-100 to-kalmar-200 rounded-tr-full opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('calculator.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.productType')}
                  </label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business-cards">Business Cards</SelectItem>
                      <SelectItem value="brochures">Brochures</SelectItem>
                      <SelectItem value="posters">Posters</SelectItem>
                      <SelectItem value="flyers">Flyers</SelectItem>
                      <SelectItem value="t-shirts">T-Shirts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.quantity')}: {quantity}
                  </label>
                  <Slider 
                    value={[quantity]}
                    min={100}
                    max={2000}
                    step={100}
                    onValueChange={(value) => setQuantity(value[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>100</span>
                    <span>2000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.size')}
                  </label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.color')}
                  </label>
                  <Select value={colors} onValueChange={setColors}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select color options" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-color">One Color</SelectItem>
                      <SelectItem value="full-color">Full Color</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.material')}
                  </label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.finishing')}
                  </label>
                  <Select value={finishing} onValueChange={setFinishing}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select finishing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="glossy">Glossy</SelectItem>
                      <SelectItem value="matte">Matte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calculator.delivery')}
                  </label>
                  <Select value={delivery} onValueChange={setDelivery}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select delivery option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                      <SelectItem value="express">Express (1-2 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result and Quote */}
              <div className="flex flex-col">
                <div className="bg-gray-50 rounded-xl p-6 mb-6 flex-1">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-kalmar-100 flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-8 w-8 text-kalmar-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('calculator.totalPrice')}</h3>
                    <div className="text-3xl font-bold text-kalmar-600 mt-2">
                      ${totalPrice}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {t('calculator.note')}
                    </p>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <NavLink
                      to="/contact"
                      className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-kalmar-600 text-white shadow-sm hover:bg-kalmar-700 transition-colors"
                    >
                      {t('buttons.requestQuote')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </NavLink>
                    <NavLink
                      to="/design"
                      className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {t('buttons.uploadDesign')}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
