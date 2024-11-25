import React, { useState } from 'react';
import { Table } from '../common/Table';
import { Card } from '../common/Card';
import { Users, TrendingUp, Phone, Mail } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  lastContact: string;
  totalSpent: number;
}

const CRM: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '(555) 123-4567',
      status: 'Active',
      lastContact: '2024-03-15',
      totalSpent: 25000
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      email: 'info@techsolutions.com',
      phone: '(555) 987-6543',
      status: 'Active',
      lastContact: '2024-03-14',
      totalSpent: 18500
    }
  ];

  const engagementData = [
    { month: 'Jan', interactions: 45 },
    { month: 'Feb', interactions: 52 },
    { month: 'Mar', interactions: 48 },
    { month: 'Apr', interactions: 61 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customer Relationship Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add Customer
        </button>
      </div>

      {/* CRM Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">248</p>
            </div>
            <Users className="h-8 w-8 text-indigo-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customer Growth</p>
              <p className="text-2xl font-bold">+12%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Engagements</p>
              <p className="text-2xl font-bold">35</p>
            </div>
            <Phone className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Customers</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow">
        <Table
          data={customers}
          columns={[
            { header: 'Customer', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Status', accessor: 'status' },
            { header: 'Last Contact', accessor: 'lastContact' },
            { 
              header: 'Total Spent', 
              accessor: 'totalSpent',
              cell: (value) => `$${value.toLocaleString()}`
            },
          ]}
        />
      </div>

      {/* Customer Engagement Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Engagement Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="interactions" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CRM;