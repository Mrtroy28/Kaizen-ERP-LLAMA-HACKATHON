import React from 'react';
import { Card } from '../common/Card';
import { DollarSign, TrendingUp, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 34000 },
  { month: 'Mar', revenue: 48000, expenses: 31000 },
  { month: 'Apr', revenue: 61000, expenses: 35000 },
  { month: 'May', revenue: 55000, expenses: 33000 },
  { month: 'Jun', revenue: 67000, expenses: 38000 }
];

const cashFlowData = [
  { date: '2024-03-01', balance: 120000 },
  { date: '2024-03-05', balance: 125000 },
  { date: '2024-03-10', balance: 118000 },
  { date: '2024-03-15', balance: 128000 },
  { date: '2024-03-20', balance: 135000 }
];

const BillingDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">$328,000</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expenses</p>
              <p className="text-2xl font-bold">$203,000</p>
            </div>
            <ArrowDownRight className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold">$125,000</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-500" />
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Invoices</p>
              <p className="text-2xl font-bold">$45,200</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold">$12,800</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cash Flow</p>
              <p className="text-2xl font-bold">+8.5%</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Revenue vs Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Cash Flow Trend */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Cash Flow Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  name="Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
          <DollarSign className="h-5 w-5" />
          Create Invoice
        </button>
        <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
          <ArrowUpRight className="h-5 w-5" />
          Record Payment
        </button>
        <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default BillingDashboard;