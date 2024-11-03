import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpDown, Search, Timer, Star, Box, Building2, Ship, Coins, ChevronDown } from 'lucide-react';
import productsData from '@/assets/data/products.json';

const INITIAL_ITEMS = 30;
const ITEMS_PER_LOAD = 20;

const ProductsTable = () => {
  const [products] = useState(productsData);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'level', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    level: 'all',
    source: 'all'
  });

  // Function to format time
  const formatTime = (minutes) => {
    if (minutes === 0) return 'Instant';
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${(minutes / 60).toFixed(1)}h`;
    return `${(minutes / 1440).toFixed(1)}d`;
  };

  // Function to format needs
  const formatNeeds = (needs, productName) => {
    if (!needs || needs.length === 0) return '-';
    return needs
      .filter(need => need.name.toLowerCase() !== productName.toLowerCase())
      .map(need => `${need.name} (${need.quantity})`)
      .join(', ') || '-';
  };

  // Format per boat crate
  const formatPerBoatCrate = (value) => {
    return value === 0 ? '-' : value;
  };

  // Get unique sources for filter
  const getSources = () => {
    const sources = [...new Set(products.map(product => product.source))];
    return sources.sort();
  };

  // Get max level for filter
  const getMaxLevel = () => {
    return Math.max(...products.map(product => product.level), 0);
  };

  useEffect(() => {
    // Simulate a small loading delay for smoother UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      let filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Apply filters
      if (filters.level !== 'all') {
        filtered = filtered.filter(product => product.level === parseInt(filters.level));
      }
      if (filters.source !== 'all') {
        filtered = filtered.filter(product => product.source === filters.source);
      }

      const sorted = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === 'max_price' || sortConfig.key === 'level' || sortConfig.key === 'xp') {
          return sortConfig.direction === 'asc' 
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      const itemsToShow = INITIAL_ITEMS + (currentPage - 1) * ITEMS_PER_LOAD;
      const paginatedProducts = sorted.slice(0, itemsToShow);
      setDisplayProducts(paginatedProducts);
      setHasMore(paginatedProducts.length < sorted.length);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [products, searchTerm, sortConfig, currentPage, filters]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const LoadingSkeleton = () => (
    Array(INITIAL_ITEMS).fill(0).map((_, idx) => (
      <TableRow key={idx}>
        {Array(8).fill(0).map((_, cellIdx) => (
          <TableCell key={cellIdx}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ))
  );

  const renderSortableHeader = (label, key, icon) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TableHead onClick={() => handleSort(key)} className="cursor-pointer">
            <div className="flex items-center gap-1 whitespace-nowrap">
              {icon && <span className="hidden sm:inline">{icon}</span>}
              <span>{label}</span>
              <ArrowUpDown className="h-4 w-4" />
            </div>
          </TableHead>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to sort by {label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <section className="py-8 px-4 md:px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Products Database</CardTitle>
          <CardDescription>
            Browse and search through all available products
          </CardDescription>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={filters.level}
                onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {[...Array(getMaxLevel())].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Level {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.source}
                onValueChange={(value) => setFilters(prev => ({ ...prev, source: value }))}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {getSources().map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {renderSortableHeader("Name", "name")}
                  {renderSortableHeader("Level", "level", <Star className="h-4 w-4" />)}
                  {renderSortableHeader("Max Price", "max_price", <Coins className="h-4 w-4" />)}
                  {renderSortableHeader("Time", "time", <Timer className="h-4 w-4" />)}
                  {renderSortableHeader("XP", "xp", <Star className="h-4 w-4" />)}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Box className="h-4 w-4" />
                            <span>Needs</span>
                          </div>
                        </TableHead>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Required items and quantities</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            <span>Source</span>
                          </div>
                        </TableHead>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Where to produce this item</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Ship className="h-4 w-4" />
                            <span>Per Boat</span>
                          </div>
                        </TableHead>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Quantity range per boat crate</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <LoadingSkeleton />
                ) : displayProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No products found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  displayProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/products/${product.name.toLowerCase()}`}
                          className="text-blue-500 hover:underline"
                        >
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>{product.level}</TableCell>
                      <TableCell>{product.max_price}</TableCell>
                      <TableCell>{formatTime(product.time)}</TableCell>
                      <TableCell>{product.xp}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={formatNeeds(product.needs, product.name)}>
                        {formatNeeds(product.needs, product.name)}
                      </TableCell>
                      <TableCell>{product.source}</TableCell>
                      <TableCell>{formatPerBoatCrate(product.per_boat_crate)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {hasMore && !loading && (
            <div className="mt-4 text-center">
              <Button onClick={loadMore} variant="outline" className="gap-2">
                Load More
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ProductsTable;