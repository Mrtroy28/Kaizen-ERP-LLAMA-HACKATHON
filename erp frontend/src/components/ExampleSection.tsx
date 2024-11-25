import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface Example {
  id: string;
  title: string;
  description: string;
  status: 'success' | 'warning' | 'pending';
  date: string;
}

const examples: Example[] = [
  {
    id: '1',
    title: 'Software Development Quote',
    description: 'Example of a complete software project quote with AI recommendations.',
    status: 'success',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Consulting Services',
    description: 'Template for IT consulting services with pricing breakdown.',
    status: 'warning',
    date: '2024-03-14'
  },
  {
    id: '3',
    title: 'Cloud Migration Project',
    description: 'Sample quote for enterprise cloud migration services.',
    status: 'pending',
    date: '2024-03-13'
  }
];

const ExampleSection: React.FC = () => {
  const getStatusIcon = (status: Example['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Example Templates</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examples.map((example) => (
          <div key={example.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">{example.title}</h3>
              </div>
              {getStatusIcon(example.status)}
            </div>
            <p className="mt-3 text-gray-600">{example.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">{example.date}</span>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleSection;