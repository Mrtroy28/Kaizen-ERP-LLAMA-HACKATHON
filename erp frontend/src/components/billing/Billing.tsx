import React, { useState } from 'react';
import { Tabs, Tab } from '../common/Tabs';
import BillingDashboard from './BillingDashboard';
import AccountsPayable from './AccountsPayable';
import AccountsReceivable from './AccountsReceivable';

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="p-6">
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <Tab id="dashboard" label="Dashboard">
          <BillingDashboard />
        </Tab>
        <Tab id="receivable" label="Accounts Receivable">
          <AccountsReceivable />
        </Tab>
        <Tab id="payable" label="Accounts Payable">
          <AccountsPayable />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Billing;