import React, { useState } from 'react';
import { Card } from '../common/Card';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Onboarding: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Company Information',
      description: 'Add your company details and business information',
      completed: false
    },
    {
      id: 2,
      title: 'Import Data',
      description: 'Import your existing customer and inventory data',
      completed: false
    },
    {
      id: 3,
      title: 'Configure Settings',
      description: 'Set up your preferences and system configurations',
      completed: false
    },
    {
      id: 4,
      title: 'Team Setup',
      description: 'Invite team members and set permissions',
      completed: false
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setSteps(steps.map(step => 
        step.id === currentStep ? { ...step, completed: true } : step
      ));
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to AI-ERP</h1>
        <p className="text-gray-600 mt-2">Let's get your business set up in just a few steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed || step.id === currentStep
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="ml-2 font-medium text-sm hidden md:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{
                      width: step.completed ? '100%' : '0%'
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-gray-600 mb-6">
          {steps[currentStep - 1].description}
        </p>

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Type</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>Select type</option>
                <option>Retail</option>
                <option>Manufacturing</option>
                <option>Services</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-600">Drag and drop your files here, or click to select files</p>
              <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Select Files
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time Zone</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team Member Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>Admin</option>
                <option>Manager</option>
                <option>User</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          onClick={handleNext}
        >
          {currentStep === steps.length ? 'Complete Setup' : 'Next Step'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;