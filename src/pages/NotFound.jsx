import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            {/* Fun Farm Icon Stack */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 animate-bounce-slow">
                <span role="img" aria-label="barn" className="text-6xl">
                  🏠
                </span>
              </div>
              <div className="absolute inset-0 animate-wiggle">
                <span role="img" aria-label="question" className="text-4xl">
                  ❓
                </span>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                Oops! Field Not Found
              </h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Looks like you've wandered into an uncharted field! Don't worry, even the best farmers take a wrong turn sometimes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </div>

            {/* Fun Farm Facts */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Did you know? 🌾
              </h3>
              <p className="text-sm text-gray-600">
                Just like crops need time to grow, sometimes pages need time to load. 
                But this one seems to be hibernating in the barn!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        .animate-wiggle {
          animation: wiggle 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default NotFound;