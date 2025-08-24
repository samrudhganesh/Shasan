import React from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink,
  Shield,
  Award,
  Clock,
  HelpCircle
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'All Services', href: '/services' },
    { name: 'Track Application', href: '/tracking' },
    { name: 'Document Upload', href: '/documents/upload' },
    { name: 'Pay Fees Online', href: '/payments' },
    { name: 'Local Projects', href: '/projects' },
    { name: 'AI Assistant', href: '/ai-assistant' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'User Guide', href: '/guide' },
    { name: 'Video Tutorials', href: '/tutorials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Support', href: '/support' },
    { name: 'Report Issue', href: '/report-issue' }
  ];

  const governmentLinks = [
    { name: 'Digital India', href: 'https://digitalindia.gov.in', external: true },
    { name: 'MyGov Portal', href: 'https://mygov.in', external: true },
    { name: 'India.gov.in', href: 'https://india.gov.in', external: true },
    { name: 'e-District', href: '/e-district' },
    { name: 'RTI Portal', href: '/rti' },
    { name: 'Grievance Portal', href: '/grievance' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Data Protection', href: '/data-protection' },
    { name: 'Accessibility', href: '/accessibility' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">GovServices</h3>
                <p className="text-sm text-gray-400">Digital India Initiative</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering citizens with seamless access to government services through digital innovation and transparency.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-400">Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-gray-400">Certified</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span className="text-xs text-gray-400">24/7</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1800-123-4567 (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@govservices.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Digital India Office, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    {link.name === 'Help Center' && <HelpCircle className="h-3 w-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Government Portals</h4>
            <ul className="space-y-2">
              {governmentLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    {link.external && <ExternalLink className="h-3 w-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">50L+</div>
              <div className="text-sm text-gray-400">Citizens Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100+</div>
              <div className="text-sm text-gray-400">Services Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get notifications about new services and important updates
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-1">
                Available in: English • हिंदी • ಕನ್ನಡ • தமிழ் • తెలుగు
              </p>
              <p className="text-xs text-gray-500">
                Best viewed in Chrome, Firefox, Safari, Edge
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Government of India. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-xs">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              This is a hackathon project for demonstration purposes. 
              Not affiliated with any government entity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;