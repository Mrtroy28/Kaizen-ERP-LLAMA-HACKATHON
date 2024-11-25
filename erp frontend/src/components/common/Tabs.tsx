import React from 'react';

interface TabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  children: React.ReactNode;
}

interface TabProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, children }) => {
  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {React.Children.map(children, (child) => {
            if (React.isValidElement<TabProps>(child)) {
              const isActive = activeTab === child.props.id;
              return (
                <button
                  onClick={() => onChange(child.props.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm
                    ${isActive
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {child.props.label}
                </button>
              );
            }
            return null;
          })}
        </nav>
      </div>
      <div className="mt-4">
        {React.Children.map(children, (child) => {
          if (React.isValidElement<TabProps>(child) && child.props.id === activeTab) {
            return child.props.children;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};