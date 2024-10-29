import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EARLY_LEVEL_XP = {
  1: 27, 2: 7, 3: 14, 4: 30, 5: 50, 6: 220, 7: 370, 8: 490, 9: 790, 10: 960,
  11: 1180, 12: 1550, 13: 1790, 14: 2270, 15: 2880, 16: 3270, 17: 4120, 
  18: 4740, 19: 5610, 20: 6320, 21: 7750, 22: 9140, 23: 10830, 24: 12200,
  25: 14000, 26: 15700, 27: 18300, 28: 20500, 29: 23400, 30: 26100,
  31: 29400, 32: 32400, 33: 35800, 34: 38700, 35: 42200, 36: 45200,
  37: 48900, 38: 54900, 39: 61800, 40: 67900, 41: 75000, 42: 81500,
  43: 94400, 44: 100800, 45: 110900, 46: 119500, 47: 129500, 48: 138000,
  49: 148400, 50: 157000
};

const Calculator = () => {
  const [formData, setFormData] = useState({
    initialLevel: '',
    finalLevel: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateXP = () => {
    const initial = parseInt(formData.initialLevel);
    const final = parseInt(formData.finalLevel);
    let totalXP = 0;

    for (let level = initial; level < final; level++) {
      if (level <= 50) {
        totalXP += EARLY_LEVEL_XP[level];
      } else if (level < 500) {
        totalXP += 157000 + 11000 * (level - 50);
      } else {
        totalXP += 5107000 + 20000 * (level - 500);
      }
    }

    return { totalXP };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const initial = parseInt(formData.initialLevel);
    const final = parseInt(formData.finalLevel);

    if (isNaN(initial) || isNaN(final)) {
      setError('Please provide valid numbers for levels.');
      return;
    }

    if (initial >= final) {
      setError('Final level must be greater than initial level.');
      return;
    }

    if (initial < 1) {
      setError('Initial level cannot be less than 1.');
      return;
    }

    const requirements = calculateXP();
    setResult(requirements);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">XP Calculator</CardTitle>
            <CardDescription className="text-center">
              Level Up Experience Calculator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="initialLevel" className="text-sm font-medium">
                  Initial Level
                </label>
                <Input
                  type="number"
                  id="initialLevel"
                  name="initialLevel"
                  value={formData.initialLevel}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="finalLevel" className="text-sm font-medium">
                  Final Level
                </label>
                <Input
                  type="number"
                  id="finalLevel"
                  name="finalLevel"
                  value={formData.finalLevel}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <span role="img" aria-label="XP">⭐</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {result.totalXP.toLocaleString()} XP
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Calculator;
