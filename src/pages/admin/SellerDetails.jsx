import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const SellerDetails = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const token = Cookies.get('userToken');
            const response = await axios.get('https://tech-cart.onrender.com/api/admin/approveSellers/pending', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSellers(response.data);
        } catch (error) {
            console.error('Error fetching pending sellers:', error);
            toast.error('Error fetching pending sellers');
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (sellerId, status) => {
        try {
            const token = Cookies.get('userToken');
            await axios.put(`https://tech-cart.onrender.com/api/admin/approveSellers/${sellerId}`, 
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            toast.success('Seller status updated successfully');
            fetchSellers();
        } catch (error) {
            toast.error('Failed to update seller status');
            console.error('Error updating seller:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Seller Management</h1>
            {loading ? (
                <div className="flex justify-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sellers.map((seller) => (
                                <tr key={seller._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {seller.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {seller.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${seller.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {seller.approved ? 'Approved' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleApproval(seller._id, !seller.approved)}
                                            className={`${
                                                seller.approved 
                                                    ? 'text-red-600 hover:text-red-900' 
                                                    : 'text-green-600 hover:text-green-900'
                                            }`}
                                        >
                                            {seller.approved ? 'Revoke' : 'Approve'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SellerDetails;