import React from 'react';
import { Quote } from '../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const mockQuotes: Quote[] = [
  {
    id: '1',
    clientName: 'Acme Corp',
    service: 'Web Development',
    amount: 5000,
    status: 'pending',
    aiRecommendation: 'High probability of conversion. Consider offering a 5% discount.',
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    clientName: 'Tech Solutions Inc',
    service: 'Cloud Migration',
    amount: 8500,
    status: 'accepted',
    aiRecommendation: 'Client has a history of repeat business. Suggest additional services.',
    createdAt: '2024-03-14'
  }
];

const QuotesList: React.FC = () => {
  const getStatusIcon = (status: Quote['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Quotes</h2>
      <div className="space-y-4">
        {mockQuotes.map((quote) => (
          <div key={quote.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{quote.clientName}</h3>
                <p className="text-gray-600">{quote.service}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${quote.amount.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(quote.status)}
                <span className="capitalize text-sm font-medium">
                  {quote.status}
                </span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">AI Recommendation:</span> {quote.aiRecommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesList;