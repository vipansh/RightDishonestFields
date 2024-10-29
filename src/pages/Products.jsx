import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UpdateIcon } from '@radix-ui/react-icons';

const Products = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgurLink = "https://res.cloudinary.com/diaxg9ypf/image/upload/v1729916700/products.png";

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Products</CardTitle>
            <CardDescription className="text-center">
              Hay Day Products by Level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative w-full min-h-[200px] rounded-lg overflow-hidden">
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
                <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                  <UpdateIcon className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                This comprehensive image shows all available products in Hay Day and their unlock levels.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Products;