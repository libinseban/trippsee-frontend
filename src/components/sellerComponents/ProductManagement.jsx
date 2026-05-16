import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://tech-cart.onrender.com/api/seller/getAllProducts', {
        withCredentials: true
      });
      setProducts(response.data);
    } catch (error) {
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
      await axios.delete(`https://tech-cart.onrender.com/api/seller/deleteProduct/${productId}`, {
        withCredentials: true
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowAddForm(!showAddForm);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProductForm 
            editingProduct={editingProduct}
            onSuccess={() => {
              fetchProducts();
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.productImages[0]}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="mt-2">
                  <p className="text-red-600 font-bold">₹{product.price}</p>
                  <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
                  <p className="text-gray-500 text-sm">Category: {product.category?.name}</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;