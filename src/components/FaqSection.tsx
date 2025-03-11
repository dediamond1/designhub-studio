
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const FaqSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]); // First FAQ is open by default

  const categories = [
    { id: 'general', label: t('faq.categories.general') },
    { id: 'design', label: t('faq.categories.design') },
    { id: 'printing', label: t('faq.categories.printing') },
    { id: 'delivery', label: t('faq.categories.delivery') },
    { id: 'payment', label: t('faq.categories.payment') }
  ];

  // Sample FAQ data - in a real app, this would come from an API or CMS
  const faqsByCategory = {
    general: [
      {
        question: "What types of printing services do you offer?",
        answer: "We offer a comprehensive range of printing services including digital printing, offset printing, large format printing, and specialty printing. Our services cover business cards, brochures, posters, banners, t-shirts, packaging, and more."
      },
      {
        question: "How long does it take to complete an order?",
        answer: "Turnaround times vary depending on the complexity and size of your order. Standard orders typically take 3-5 business days, while rush orders can be completed in as little as 24-48 hours for an additional fee. Large custom projects may require more time."
      },
      {
        question: "Do you offer design services or just printing?",
        answer: "We offer both! Our in-house design team can create custom designs for your project or help refine your existing designs. We can also print from your print-ready files if you already have a design prepared."
      }
    ],
    design: [
      {
        question: "What file formats do you accept for printing?",
        answer: "We accept PDF, AI, PSD, EPS, TIFF, and JPEG files. For the best results, we recommend high-resolution PDFs with embedded fonts and images set to CMYK color mode."
      },
      {
        question: "Can you help me create a logo for my business?",
        answer: "Yes, our design team specializes in creating professional logos and branding materials. We'll work with you to understand your business and create a logo that reflects your brand identity."
      }
    ],
    printing: [
      {
        question: "What is the difference between digital and offset printing?",
        answer: "Digital printing is ideal for smaller print runs and allows for variable data printing. Offset printing provides superior quality and cost efficiency for larger quantities and offers more paper options and special ink capabilities."
      },
      {
        question: "Do you offer environmentally friendly printing options?",
        answer: "Yes, we offer eco-friendly printing options including recycled papers, soy-based inks, and energy-efficient production processes. We're committed to minimizing our environmental impact."
      }
    ],
    delivery: [
      {
        question: "Do you offer shipping services?",
        answer: "Yes, we ship nationwide and internationally. Shipping costs are calculated based on weight, dimensions, and delivery location. We offer standard and expedited shipping options."
      },
      {
        question: "Can I pick up my order in person?",
        answer: "Absolutely! You're welcome to pick up your order at our facility once it's complete. We'll notify you when your order is ready for pickup."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. For large orders, we may require a deposit before beginning production."
      },
      {
        question: "Do you offer quantity discounts?",
        answer: "Yes, we offer tiered pricing with discounts for larger quantities. Contact us for a custom quote for your specific project requirements."
      }
    ]
  };

  const currentFaqs = faqsByCategory[activeCategory as keyof typeof faqsByCategory] || [];

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('faq.description')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full transition-all text-sm font-medium",
                activeCategory === category.id
                  ? "bg-kalmar-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {currentFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openFaqs.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-kalmar-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              <AnimatePresence>
                {openFaqs.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* More FAQs Button */}
        <div className="text-center mt-8">
          <NavLink
            to="/faq"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            {t('faq.readMore')}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
