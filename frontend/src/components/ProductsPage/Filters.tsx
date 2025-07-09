import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/Shadcn/Select';
import { useFilters } from '@/hooks/useFilters';
import { type FilterComponentProps } from './types';

const FilterComponent = ({ filters, onFilterChange }: FilterComponentProps) => {
  const {
    stores,
    minPrice,
    maxPrice,
    handlePriceChange,
    handleStoreChange,
    resetFilters
  } = useFilters(filters);

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
            
            <label htmlFor="price-range-min" className="sr-only">Prix minimum</label>
            <input
              id="price-range-min"
              type="range"
              min="0"
              max="25000"
              value={minPrice}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value), onFilterChange, filters)}
              className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto range-thumb"
              aria-label="Prix minimum"
            />
            <label htmlFor="price-range-max" className="sr-only">Prix maximum</label>
            <input
              id="price-range-max"
              type="range"
              min="0"
              max="25000"
              value={maxPrice}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value), onFilterChange, filters)}
              className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto range-thumb"
              aria-label="Prix maximum"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{minPrice.toLocaleString()} DH</span>
            <span>{maxPrice.toLocaleString()} DH</span>
          </div>
        </div>

        {/* Store Selection */}
        <Select value={filters.selectedStore} onValueChange={(storeId) => handleStoreChange(storeId, onFilterChange, filters)}>
          <SelectTrigger className="w-full mt-4 text-lg px-5 py-6 border border-gray-300 rounded-md bg-white text-gray-500">
            <SelectValue placeholder="Choose store" />
          </SelectTrigger>
          <SelectContent>
            {stores
              .filter(store => store.store_status === 'published')
              .map((store) => (
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
          onClick={() => resetFilters(onFilterChange)}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
