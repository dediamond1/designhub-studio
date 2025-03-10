
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Ads = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Advertising & Sponsorship</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Advertising Opportunities</h2>
              <p className="mb-4">Partner with Kalmar Studio to reach our growing audience of design enthusiasts and business professionals.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Print ads in our catalog and materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Digital advertising on our website</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Newsletter features to our subscriber base</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Social media collaborations</span>
                </li>
              </ul>
              <button className="bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors">
                Request Media Kit
              </button>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Sponsorship Programs</h2>
              <p className="mb-4">Support our events and initiatives while gaining exposure for your brand.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Design workshops and seminars</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Industry exhibitions and trade shows</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Community print projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Educational programs</span>
                </li>
              </ul>
              <button className="bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors">
                Become a Sponsor
              </button>
            </div>
          </div>
          
          <div className="bg-muted p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Audience</h2>
            <p className="mb-6">Connect with our diverse and engaged audience of:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background p-4 rounded text-center">
                <p className="text-3xl font-bold text-primary mb-2">10k+</p>
                <p className="text-sm">Monthly Website Visitors</p>
              </div>
              <div className="bg-background p-4 rounded text-center">
                <p className="text-3xl font-bold text-primary mb-2">5k+</p>
                <p className="text-sm">Social Media Followers</p>
              </div>
              <div className="bg-background p-4 rounded text-center">
                <p className="text-3xl font-bold text-primary mb-2">3k+</p>
                <p className="text-sm">Newsletter Subscribers</p>
              </div>
              <div className="bg-background p-4 rounded text-center">
                <p className="text-3xl font-bold text-primary mb-2">500+</p>
                <p className="text-sm">Business Partners</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Contact Our Advertising Team</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full rounded border-input bg-background px-3 py-2"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full rounded border-input bg-background px-3 py-2"
                    placeholder="Your company"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full rounded border-input bg-background px-3 py-2"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full rounded border-input bg-background px-3 py-2"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium mb-1">I'm interested in</label>
                <select id="interest" className="w-full rounded border-input bg-background px-3 py-2">
                  <option value="">Select an option</option>
                  <option value="print-ads">Print Advertising</option>
                  <option value="digital-ads">Digital Advertising</option>
                  <option value="event-sponsorship">Event Sponsorship</option>
                  <option value="partnership">Strategic Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full rounded border-input bg-background px-3 py-2"
                  placeholder="Tell us about your advertising needs or sponsorship interests"
                ></textarea>
              </div>
              
              <button type="submit" className="bg-primary text-primary-foreground py-2 px-6 rounded hover:bg-primary/90 transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ads;
