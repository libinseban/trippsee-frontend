import React from 'react';

function NewComponents() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-black-800 mb-6 text-center ">Summer Essentials</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1558979158-65a1eaa08691"
                alt="Beach Hat"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-black-700">Beach Hat</h3>
              <p className="text-red-600 font-bold">Up to 50% Off</p>
            </div>
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="https://m.media-amazon.com/images/I/71oFZKfDHhL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-black-700">Sunglasses</h3>
              <p className="text-red-600 font-bold">New Arrivals</p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl font-bold text-black-800 mb-6 text-center">Outdoor Gear</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1504215680853-026ed2a45def"
                alt="Camping Tent"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-black-700">Camping Tent</h3>
              <p className="text-red-600 font-bold">Special Offer</p>
            </div>
            {/* Card 2 */}
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="https://m.media-amazon.com/images/I/814HLmcMJVL._AC_UL960_FMwebp_QL65_.jpg"
                alt="Travel Backpack"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-black-700">Travel Backpack</h3>
              <p className="text-red-600 font-bold">Min. 30% Off</p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-2xl font-bold text-black-800 mb-6 text-center">Fitness Essentials</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="https://www.bing.com/th?id=OPAC.jxjaTnN%2fY0Eyyw474C474&o=5&pid=21.1&w=160&h=235&rs=1&qlt=100&dpr=1.3&c=8&pcl=f5f5f5"
                alt="Running Shoes"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-black-700">Running Shoes</h3>
              <p className="text-red-600 font-bold">Hot Deal</p>
            </div>
            {/* Card 2 */}
            <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
                alt="Dumbbells"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-black-700">Dumbbells</h3>
              <p className="text-red-600 font-bold">Best Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewComponents;
