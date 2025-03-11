
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Ads = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Advertising & Sponsorship</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Advertising Opportunities</h2>
            <p className="text-lg mb-4">
              Reach our audience of design professionals and enthusiasts through strategic
              advertising placements on our platform.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {/* Ad Placement Options */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Website Banners</h3>
                <p>Strategic placements on high-traffic pages.</p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Newsletter Features</h3>
                <p>Reach our subscribers directly in their inbox.</p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Sponsored Content</h3>
                <p>Native content created to engage our audience.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sponsorship Packages</h2>
            <p className="text-lg mb-4">
              Become a sponsor and gain exclusive access to our community through comprehensive partnership packages.
            </p>
            <div className="space-y-4 mt-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Bronze Sponsor</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Logo placement on website</li>
                  <li>Monthly social media mentions</li>
                  <li>Newsletter recognition</li>
                </ul>
              </div>
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Silver Sponsor</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All Bronze benefits</li>
                  <li>Sponsored blog post</li>
                  <li>Webinar participation</li>
                  <li>Featured in case studies</li>
                </ul>
              </div>
              <div className="border rounded-lg p-6 bg-gray-100">
                <h3 className="text-xl font-medium mb-2">Gold Sponsor</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All Silver benefits</li>
                  <li>Premium placement in all materials</li>
                  <li>Co-branded events</li>
                  <li>Exclusive industry reports</li>
                  <li>Direct access to our network</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Our Advertising Team</h2>
            <p className="text-lg mb-6">
              Interested in our advertising opportunities? Contact our team to discuss
              custom solutions tailored to your goals.
            </p>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <p><strong>Email:</strong> advertising@kalmarstudio.com</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <div className="mt-4">
                  <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors">
                    Request Media Kit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ads;
