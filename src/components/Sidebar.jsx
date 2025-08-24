import React, { useState } from "react";
import {
  Home,
  FileText,
  Search,
  MapPin,
  FolderOpen,
  MessageSquare,
  BarChart3,
  Bell,
  Users,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Briefcase,
  CreditCard,
  Phone,
  Star,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    services: false,
    documents: false,
    community: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const mainMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    {
      icon: FileText,
      label: "Services",
      href: "/services",
      expandable: true,
      key: "services",
      subItems: [
        { label: "All Services", href: "/services" },
        { label: "Birth Certificate", href: "/services/birth-certificate" },
        { label: "Passport", href: "/services/passport" },
        { label: "Property Tax", href: "/services/property-tax" },
        { label: "Driving License", href: "/services/driving-license" },
        { label: "Business License", href: "/services/business-license" },
      ],
    },
    { icon: Search, label: "Track Applications", href: "/tracking" },
    { icon: MapPin, label: "Local Projects", href: "/projects" },
    {
      icon: FolderOpen,
      label: "Documents",
      href: "/documents",
      expandable: true,
      key: "documents",
      subItems: [
        { label: "My Documents", href: "/documents" },
        { label: "Upload Documents", href: "/documents/upload" },
        { label: "Family Documents", href: "/documents/family" },
        { label: "Expiry Alerts", href: "/documents/alerts" },
      ],
    },
    { icon: MessageSquare, label: "AI Assistant", href: "/ai-assistant" },
    {
      icon: Users,
      label: "Community",
      href: "/community",
      expandable: true,
      key: "community",
      subItems: [
        { label: "Local Forum", href: "/community/forum" },
        { label: "Representatives", href: "/community/representatives" },
        { label: "Public Meetings", href: "/community/meetings" },
        { label: "Volunteer", href: "/community/volunteer" },
      ],
    },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
  ];

  const quickActions = [
    {
      icon: FileText,
      label: "New Application",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: CreditCard,
      label: "Pay Fees",
      color: "bg-green-100 text-green-600",
    },
    { icon: Phone, label: "Emergency", color: "bg-red-100 text-red-600" },
    {
      icon: HelpCircle,
      label: "Help Center",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const MenuLink = ({ item, isSubItem = false }) => {
    const IconComponent = item.icon;
    const isExpanded = expandedSections[item.key];

    return (
      <div>
        <a
          href={item.href}
          onClick={(e) => {
            if (item.expandable) {
              e.preventDefault();
              toggleSection(item.key);
            }
          }}
          className={`
            flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              item.active
                ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }
            ${isSubItem ? "ml-6 py-1.5" : ""}
          `}
        >
          <div className="flex items-center space-x-3">
            <IconComponent size={18} />
            <span>{item.label}</span>
          </div>
          {item.expandable && (
            <div className="transition-transform duration-200">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          )}
        </a>

        {/* Sub Items */}
        {item.expandable && isExpanded && item.subItems && (
          <div className="mt-1 space-y-1">
            {item.subItems.map((subItem, index) => (
              <a
                key={index}
                href={subItem.href}
                className="flex items-center px-3 py-1.5 ml-6 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                {subItem.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Menu</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              {mainMenuItems.map((item, index) => (
                <MenuLink key={index} item={item} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      className={`
                        flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:opacity-80
                        ${action.color}
                      `}
                    >
                      <IconComponent size={16} />
                      <span className="text-xs font-medium mt-1">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Recent Applications
              </h3>
              <div className="mt-3 space-y-2">
                <div className="px-3 py-2 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Birth Certificate
                      </p>
                      <p className="text-xs text-yellow-600">In Progress</p>
                    </div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Property Tax
                      </p>
                      <p className="text-xs text-green-600">Completed</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">RK</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Rajesh Kumar
                </p>
                <p className="text-xs text-gray-500">Citizen ID: 1234567890</p>
              </div>
            </div>

            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={16} className="mr-3" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
