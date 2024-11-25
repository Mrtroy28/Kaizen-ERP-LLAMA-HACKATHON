import React, { useState } from 'react';
import { Table } from '../common/Table';
import { Card } from '../common/Card';
import { ShoppingCart, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: number;
  total: number;
  status: string;
  orderDate: string;
  expectedDelivery: string;
}

const Purchasing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const purchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO-001',
      supplier: 'Office Supplies Co',
      items: 12,
      total: 2500,
      status: 'Pending',
      orderDate: '2024-03-15',
      expectedDelivery: '2024-03-22'
    },
    {
      id: 'PO-002',
      supplier: 'Tech Hardware Ltd',
      items: 8,
      total: 4800,
      status: 'Shipped',
      orderDate: '2024-03-14',
      expectedDelivery: '2024-03-21'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Order Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Create Purchase Order
        </button>
      </div>

      {/* Purchase Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-indigo-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Spend</p>
              <p className="text-2xl font-bold">$45,200</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late Deliveries</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search purchase orders..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="shipped">Shipped</option>
        </select>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <Table
          data={purchaseOrders}
          columns={[
            { header: 'PO Number', accessor: 'id' },
            { header: 'Supplier', accessor: 'supplier' },
            { header: 'Items', accessor: 'items' },
            { 
              header: 'Total', 
              accessor: 'total',
              cell: (value) => `$${value.toLocaleString()}`
            },
            { header: 'Status', accessor: 'status' },
            { header: 'Order Date', accessor: 'orderDate' },
            { header: 'Expected Delivery', accessor: 'expectedDelivery' },
          ]}
        />
      </div>
    </div>
  );
};

export default Purchasing;