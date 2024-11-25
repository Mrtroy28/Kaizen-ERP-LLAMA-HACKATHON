import React, { useState } from 'react';
import { Table } from '../common/Table';
import { Card } from '../common/Card';
import { Package, AlertTriangle, TrendingUp, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryItems = [
    { id: 1, name: 'Product A', sku: 'SKU001', quantity: 150, reorderPoint: 50, status: 'In Stock' },
    { id: 2, name: 'Product B', sku: 'SKU002', quantity: 30, reorderPoint: 40, status: 'Low Stock' },
    { id: 3, name: 'Product C', sku: 'SKU003', quantity: 0, reorderPoint: 25, status: 'Out of Stock' },
  ];

  const stockTrends = [
    { month: 'Jan', stock: 120 },
    { month: 'Feb', stock: 150 },
    { month: 'Mar', stock: 90 },
    { month: 'Apr', stock: 180 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add New Item
        </button>
      </div>

      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">180</p>
            </div>
            <Package className="h-8 w-8 text-indigo-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Value</p>
              <p className="text-2xl font-bold">$45,200</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search inventory..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="office">Office Supplies</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow">
        <Table
          data={inventoryItems}
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'SKU', accessor: 'sku' },
            { header: 'Quantity', accessor: 'quantity' },
            { header: 'Reorder Point', accessor: 'reorderPoint' },
            { header: 'Status', accessor: 'status' },
          ]}
        />
      </div>

      {/* Stock Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Stock Level Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={stockTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#4F46E5" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Inventory;