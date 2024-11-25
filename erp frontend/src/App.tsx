import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, BarChart3, Settings as SettingsIcon, 
  Users, Package, CreditCard, ShoppingCart, MessageSquare, BookOpen 
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Billing from './components/billing/Billing';
import Inventory from './components/inventory/Inventory';
import CRM from './components/crm/CRM';
import Purchasing from './components/purchasing/Purchasing';
import Settings from './components/Settings';
import Onboarding from './components/onboarding/Onboarding';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-indigo-600">AI-ERP</h1>
          </div>
          <nav className="mt-6">
            <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/billing" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <CreditCard className="h-5 w-5 mr-3" />
              Billing
            </Link>
            <Link to="/inventory" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <Package className="h-5 w-5 mr-3" />
              Inventory
            </Link>
            <Link to="/crm" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <Users className="h-5 w-5 mr-3" />
              CRM
            </Link>
            <Link to="/purchasing" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <ShoppingCart className="h-5 w-5 mr-3" />
              Purchasing
            </Link>
            <Link to="/onboarding" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <BookOpen className="h-5 w-5 mr-3" />
              Onboarding
            </Link>
            <Link to="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              <SettingsIcon className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/purchasing" element={<Purchasing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          
          {/* Chat Widget */}
          <ChatWidget />
        </div>
      </div>
    </Router>
  );
}

export default App;