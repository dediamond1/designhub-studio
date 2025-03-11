
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../utils/animations';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(sectionRef, 0.1);
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be where you'd handle the form submission
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-kalmar-50">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider border border-primary/30 rounded-full bg-primary/5">
                {t('contact.tagline')}
              </span>
            </div>

            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('contact.title')}
            </h2>

            <p
              className={cn(
                "text-foreground/70 mb-8 transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('contact.messageDescription')}
            </p>

            <div
              className={cn(
                "bg-white p-6 rounded-xl shadow-subtle mb-8 transition-all duration-700 delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <h3 className="text-lg font-semibold mb-2">{t('contact.quoteBox.title')}</h3>
              <p className="text-foreground/70">
                {t('contact.quoteBox.description')}
              </p>
            </div>

            <NavLink
              to="/contact"
              className={cn(
                "button-primary group inline-flex transition-all duration-700 delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {t('common.contactUs')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </div>

          <div
            className={cn(
              "bg-white rounded-2xl p-8 shadow-card transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h3 className="text-xl font-semibold mb-5">{t('contact.messageTitle')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t('contact.form.name')}
                  </label>
                  <Input 
                    id="name" 
                    placeholder={t('contact.form.name')} 
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('contact.form.email')}
                  </label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder={t('contact.form.email')} 
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  {t('contact.form.subject')}
                </label>
                <select 
                  id="subject"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">{t('contact.form.subject')}</option>
                  <option value="quote">{t('contact.form.subjectOptions.quote')}</option>
                  <option value="info">{t('contact.form.subjectOptions.info')}</option>
                  <option value="support">{t('contact.form.subjectOptions.support')}</option>
                  <option value="other">{t('contact.form.subjectOptions.other')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  {t('contact.form.message')}
                </label>
                <Textarea 
                  id="message" 
                  rows={4}
                  placeholder={t('contact.form.message')} 
                  className="w-full"
                />
              </div>
              
              <Button type="submit" className="w-full group">
                {t('common.submitMessage')}
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
