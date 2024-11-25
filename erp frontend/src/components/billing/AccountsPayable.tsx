import React, { useState } from 'react';
import { Table } from '../common/Table';
import { Card } from '../common/Card';
import { ArrowDownRight, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

interface Bill {
  id: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: string;
  category: string;
}

const AccountsPayable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bills: Bill[] = [
    {
      id: 'BILL-001',
      vendor: 'Office Supplies Co',
      amount: 2500,
      dueDate: '2024-03-25',
      status: 'Pending',
      category: 'Supplies'
    },
    {
      id: 'BILL-002',
      vendor: 'IT Services Ltd',
      amount: 4800,
      dueDate: '2024-03-28',
      status: 'Overdue',
      category: 'Services'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Accounts Payable</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add New Bill
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Payables</p>
              <p className="text-2xl font-bold">$45,200</p>
            </div>
            <ArrowDownRight className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Due This Week</p>
              <p className="text-2xl font-bold">$12,800</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid This Month</p>
              <p className="text-2xl font-bold">$28,500</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold">$4,800</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search bills..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Categories</option>
          <option value="supplies">Supplies</option>
          <option value="services">Services</option>
          <option value="utilities">Utilities</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow">
        <Table
          data={bills}
          columns={[
            { header: 'Bill ID', accessor: 'id' },
            { header: 'Vendor', accessor: 'vendor' },
            { 
              header: 'Amount', 
              accessor: 'amount',
              cell: (value) => `$${value.toLocaleString()}`
            },
            { header: 'Due Date', accessor: 'dueDate' },
            { header: 'Status', accessor: 'status' },
            { header: 'Category', accessor: 'category' },
          ]}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Pay Selected Bills
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default AccountsPayable;