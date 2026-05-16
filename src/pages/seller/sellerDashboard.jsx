import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ProductForm from '../../components/sellerComponents/productForm';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/seller/getAllProducts', {
        withCredentials: true
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/seller/deleteProduct/${productId}`, {
        withCredentials: true
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Seller Dashboard</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showAddForm ? 'Hide Form' : 'Add New Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-4 rounded shadow">
          <ProductForm onProductAdded={() => {
            fetchProducts();
            setShowAddForm(false);
          }} />
        </div>
      )}

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img
                src={product.productImages[0]}
                alt={product.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-2">
                <p className="text-green-600 font-bold">₹{product.price}</p>
                <p className="text-gray-500">Brand: {product.brand}</p>
                <p className="text-gray-500">Category: {product.category.name}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;