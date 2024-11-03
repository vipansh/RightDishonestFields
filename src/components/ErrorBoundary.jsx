import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="container mx-auto p-4">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{error.message || 'An unexpected error occurred'}</p>
          {error.stack && process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
              {error.stack}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorBoundary;