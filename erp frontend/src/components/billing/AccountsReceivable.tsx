import React, { useState } from 'react';
import { Table } from '../common/Table';
import { Card } from '../common/Card';
import { ArrowUpRight, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: string;
  type: string;
}

const AccountsReceivable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      customer: 'Acme Corp',
      amount: 5000,
      dueDate: '2024-03-25',
      status: 'Outstanding',
      type: 'Services'
    },
    {
      id: 'INV-002',
      customer: 'Tech Solutions Inc',
      amount: 3500,
      dueDate: '2024-03-28',
      status: 'Overdue',
      type: 'Products'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Accounts Receivable</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Create Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Receivables</p>
              <p className="text-2xl font-bold">$58,500</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Due This Week</p>
              <p className="text-2xl font-bold">$15,200</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collected This Month</p>
              <p className="text-2xl font-bold">$32,800</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold">$3,500</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search invoices..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Types</option>
          <option value="services">Services</option>
          <option value="products">Products</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Status</option>
          <option value="outstanding">Outstanding</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow">
        <Table
          data={invoices}
          columns={[
            { header: 'Invoice ID', accessor: 'id' },
            { header: 'Customer', accessor: 'customer' },
            { 
              header: 'Amount', 
              accessor: 'amount',
              cell: (value) => `$${value.toLocaleString()}`
            },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Status', accessor: 'status' },
            { header: 'Type', accessor: 'type' },
          ]}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Record Payment
        </button>
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
          Send Reminders
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default AccountsReceivable;