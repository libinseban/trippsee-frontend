import React, { useState } from 'react';
import SellerSidebar from './SellerSlider';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

const SellerPage = () => {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'analytics':
        return <div>Analytics Coming Soon...</div>;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SellerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;