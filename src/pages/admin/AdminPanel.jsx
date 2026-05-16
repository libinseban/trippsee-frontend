import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from '../../helper/cookies'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://tech-cart.onrender.com/api/admin/${status}/orders`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setOrders(res.data.orders);
      } else {
        console.error(`Error fetching ${status} orders:`, res.data.error);
      }
    } catch (error) {
      console.error(`Error fetching ${status} orders:`, error);
    } finally {
      setLoading(false);
    }
  };
  

  // Logout function
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "https://tech-cart.onrender.com/api/admin/logout",
        {},
        { withCredentials: true }
      );
      Cookies.remove("access_token")
      if (res.status === 200) {
        window.location.href = "/signin"; // Redirect to login page after logout
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;
  
    try {
      const res = await axios.put(
        `https://tech-cart.onrender.com/api/admin/deleteOrder/${orderId}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setOrders(orders.filter((order) => order._id !== orderId));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  

  useEffect(() => {
    fetchOrders("confirmed");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-blue-900">
            Admin Order Dashboard
          </h2>
          <button
  className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-800 text-white transition font-bold"
  onClick={handleLogout}
>
  <span>Log Out</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 11-2 0V4H9v12h2v-1a1 1 0 112 0v2a1 1 0 01-1 1H8a1 1 0 01-1-1V3zm5.707 8.707a1 1 0 01-1.414-1.414L14.586 9H3a1 1 0 010-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5z"
      clipRule="evenodd"
    />
  </svg>
</button>

        </div>

        {/* Order Filter Buttons */}
        <div className="grid grid-cols-2 md:flex md:justify-start gap-4 mb-6">
          {["pending","confirmed", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition w-full md:w-auto"
              onClick={() => fetchOrders(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Orders
            </button>
          ))}
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center text-lg font-semibold text-blue-700">
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer Name</th>
                  <th className="py-3 px-4 text-left">Total Price</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr
                      key={order._id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="py-3 px-4">{order._id}</td>
                      <td className="py-3 px-4">{order.customerName}</td>
                      <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            order.orderStatus === "confirmed"
                              ? "bg-blue-500"
                              : order.orderStatus === "shipped"
                              ? "bg-yellow-500"
                              : order.orderStatus === "delivered"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;