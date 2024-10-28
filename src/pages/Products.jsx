import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Products = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgurLink = "https://res.cloudinary.com/diaxg9ypf/image/upload/v1729916700/products.png";

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Products
          </h2>
          <p className="text-sm text-gray-600">
            Hay Day Products by Level
          </p>
        </div>

        <Card className="w-full">
          <CardContent>
            <div className="relative w-full">
              <div className={`
                transition-opacity duration-300 
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}>
                <img
                  src={imgurLink}
                  alt="Hay Day Products"
                  className="w-full h-auto rounded-lg shadow-md"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>This comprehensive image shows all available products in Hay Day and their unlock levels.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Products;