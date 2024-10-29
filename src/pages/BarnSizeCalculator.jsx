import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MIN_INITIAL = 50;
const MAX_INITIAL = 24975;
const MIN_FINAL = 75;
const MAX_FINAL = 25000;
const STEP = 25;

const Calculator = () => {
  const [formData, setFormData] = useState({
    initialCapacity: '',
    finalCapacity: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const solve = (x) => {
    let ans = 0;
    if (x <= 1000) {
      x = x - 50;
      let curr = Math.floor(x / 25);
      ans = (curr * (curr + 1)) / 2;
    } else {
      x = x - 1000;
      let curr = Math.floor(x / 50) + 38;
      ans = (curr * (curr + 1)) / 2;
    }
    return ans;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const initial = parseInt(formData.initialCapacity);
    const final = parseInt(formData.finalCapacity);

    if (isNaN(initial) || isNaN(final)) {
      setError('Please provide valid numbers for initial and final capacity.');
      return;
    }

    if (initial < MIN_INITIAL || initial > MAX_INITIAL) {
      setError(`Initial capacity must be between ${MIN_INITIAL} and ${MAX_INITIAL}.`);
      return;
    }

    if (final < MIN_FINAL || final > MAX_FINAL) {
      setError(`Final capacity must be between ${MIN_FINAL} and ${MAX_FINAL}.`);
      return;
    }

    if (initial % STEP !== 0 || final % STEP !== 0) {
      setError('Capacity values must be in increments of 25.');
      return;
    }

    if (initial >= final) {
      setError('Initial capacity must be less than final capacity.');
      return;
    }

    const tools = solve(final) - solve(initial);
    const setsNeeded = ((tools * 3) / 89).toFixed(2);
    setResult({ tools, setsNeeded });
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
            <CardTitle className="text-2xl text-center">Storage Calculator</CardTitle>
            <CardDescription className="text-center">
              Barn & Silo Upgrade Calculator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="initialCapacity" className="text-sm font-medium">
                  Initial Capacity
                </label>
                <Input
                  type="number"
                  id="initialCapacity"
                  name="initialCapacity"
                  value={formData.initialCapacity}
                  onChange={handleChange}
                  min={MIN_INITIAL}
                  max={MAX_INITIAL}
                  step={STEP}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="finalCapacity" className="text-sm font-medium">
                  Final Capacity
                </label>
                <Input
                  type="number"
                  id="finalCapacity"
                  name="finalCapacity"
                  value={formData.finalCapacity}
                  onChange={handleChange}
                  min={MIN_FINAL}
                  max={MAX_FINAL}
                  step={STEP}
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
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span role="img" aria-label="Bolt">🔩</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{result.tools}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span role="img" aria-label="Plank">🪵</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{result.tools}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span role="img" aria-label="Tape">🧻</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{result.tools}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border text-center">
                  <h4 className="font-medium text-foreground mb-2">
                    Total Sets Required
                  </h4>
                  <p className="text-sm font-medium text-primary">
                    {result.setsNeeded} sets
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Calculator;