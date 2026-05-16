import React from 'react';
import { FaBox, FaShoppingCart, FaChartLine } from 'react-icons/fa';

const SellerSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'products', label: 'Products', icon: <FaBox /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingCart /> },
    { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Seller Dashboard</h2>
      <ul>
        {menuItems.map((item) => (
          <li 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 py-3 px-4 cursor-pointer rounded-md transition-colors
              ${activeTab === item.id ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerSidebar;