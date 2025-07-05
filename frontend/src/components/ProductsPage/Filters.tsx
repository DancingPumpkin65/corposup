import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/Shadcn/Select';

interface Store {
  id: number;
  store_name: string;
}

interface Filters {
  priceRange: { min: number; max: number };
  selectedStore: string;
  sortBy: string;
}

interface FilterComponentProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterComponent = ({ filters, onFilterChange }: FilterComponentProps) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [minPrice, setMinPrice] = useState(filters.priceRange.min);
  const [maxPrice, setMaxPrice] = useState(filters.priceRange.max);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = {
      min: type === 'min' ? value : minPrice,
      max: type === 'max' ? value : maxPrice
    };
    
    if (type === 'min') setMinPrice(value);
    if (type === 'max') setMaxPrice(value);
    
    onFilterChange({
      ...filters,
      priceRange: newRange
    });
  };

  const handleStoreChange = (storeId: string) => {
    onFilterChange({
      ...filters,
      selectedStore: storeId
    });
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: { min: 0, max: 25000 },
      selectedStore: '',
      sortBy: 'popularity'
    };
    setMinPrice(0);
    setMaxPrice(25000);
    onFilterChange(defaultFilters);
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Filters</h2>
      <div className="mt-4">
        {/* Price Range */}
        <div className="mb-8">
          <h2 className="text-md font-semibold text-gray-500">Price range</h2>
          <div className="relative w-full mt-4">
            <div className="h-1 bg-gray-300 rounded-full"></div>
            <div 
              className="absolute top-0 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${(minPrice / 25000) * 100}%`,
                width: `${((maxPrice - minPrice) / 25000) * 100}%`
              }}
            ></div>
            
            <input
              type="range"
              min="0"
              max="25000"
              value={minPrice}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
              className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto range-thumb"
            />
            <input
              type="range"
              min="0"
              max="25000"
              value={maxPrice}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
              className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto range-thumb"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{minPrice.toLocaleString()} DH</span>
            <span>{maxPrice.toLocaleString()} DH</span>
          </div>
        </div>

        {/* Store Selection */}
        <Select value={filters.selectedStore} onValueChange={handleStoreChange}>
          <SelectTrigger className="w-full mt-4 text-lg px-5 py-6 border border-gray-300 rounded-md bg-white text-gray-500">
            <SelectValue placeholder="Choose store" />
          </SelectTrigger>
          <SelectContent>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id.toString()}>
                {store.store_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Buttons */}
        <button 
          className="mt-6 bg-orange-500 text-white w-full py-2 rounded-md font-bold hover:bg-orange-600 transition-colors"
          onClick={() => onFilterChange(filters)}
        >
          FILTER
        </button>
        <button 
          className="mt-2 text-orange-500 w-full py-3 font-semibold hover:underline"
          onClick={resetFilters}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
