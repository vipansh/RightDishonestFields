import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Timer, Star, Box, Building2, Ship, Coins, ChevronDown, ChevronUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import productsData from '@/assets/data/products.json';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [usedIn, setUsedIn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsedInOpen, setIsUsedInOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundProduct = productsData.find(p => p.name.toLowerCase() === productId.toLowerCase());

    // Find all products that use this item
    const usedInProducts = productsData.filter(p => 
      p.needs?.some(need => need.name.toLowerCase() === productId.toLowerCase())
    ).map(p => ({
      ...p,
      requiredQuantity: p.needs.find(need => 
        need.name.toLowerCase() === productId.toLowerCase()
      ).quantity
    }));

    // Sort by level and then by name
    usedInProducts.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return a.name.localeCompare(b.name);
    });

    setTimeout(() => {
      setProduct(foundProduct);
      setUsedIn(usedInProducts);
      setLoading(false);
    }, 1000);
  }, [productId]);

  const formatTime = (minutes) => {
    if (minutes === 0) return 'Instant';
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${(minutes / 60).toFixed(1)}h`;
    return `${(minutes / 1440).toFixed(1)}d`;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{product.name}</CardTitle>
              <CardDescription>Level {product.level} Product from {product.source}</CardDescription>
            </div>
            {usedIn.length > 0 && (
              <Badge variant="secondary">Used in {usedIn.length} product{usedIn.length !== 1 ? 's' : ''}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="relative aspect-square rounded-lg border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <img 
                    src={`/api/placeholder/400/400`} 
                    alt={product.name}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">Production Time</p>
                      <p className="font-medium">{formatTime(product.time)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Coins className="h-4 w-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">Max Price</p>
                      <p className="font-medium">{product.max_price}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">XP Gained</p>
                      <p className="font-medium">{product.xp}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Ship className="h-4 w-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">Per Boat Crate</p>
                      <p className="font-medium">{product.per_boat_crate || '-'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {product.needs && product.needs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Required Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead>Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.needs.map((need, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <a 
                                href={`/products/${need.name.toLowerCase()}`}
                                className="text-blue-500 hover:underline"
                              >
                                {need.name}
                              </a>
                            </TableCell>
                            <TableCell>{need.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {usedIn.length > 0 && (
            <div className="mt-6">
              <Collapsible
                open={isUsedInOpen}
                onOpenChange={setIsUsedInOpen}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">Used In</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      {isUsedInOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Quantity Needed</TableHead>
                          <TableHead className="hidden md:table-cell">Source</TableHead>
                          <TableHead className="hidden md:table-cell">Production Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usedIn.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <a 
                                href={`/products/${product.name.toLowerCase()}`}
                                className="text-blue-500 hover:underline"
                              >
                                {product.name}
                              </a>
                            </TableCell>
                            <TableCell>{product.level}</TableCell>
                            <TableCell>{product.requiredQuantity}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.source}</TableCell>
                            <TableCell className="hidden md:table-cell">{formatTime(product.time)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;